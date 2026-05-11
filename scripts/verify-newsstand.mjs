import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const APP_URL = "http://127.0.0.1:3000";
const DEBUG_PORT = 9222;
const DEBUG_URL = `http://127.0.0.1:${DEBUG_PORT}`;
const SCREENSHOT_PATH = "/tmp/newsstand-verify.png";

const checks = [];

await rm("/tmp/news-state-tests", { force: true, recursive: true }).catch(
  () => {},
);

const chromeProfileDir = await createTempDir("newsstand-chrome-");
const devServer = spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3000"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: ["ignore", "pipe", "pipe"],
});

let devLogs = "";
devServer.stdout.on("data", (chunk) => {
  devLogs += chunk.toString();
});
devServer.stderr.on("data", (chunk) => {
  devLogs += chunk.toString();
});

const chrome = spawn(
  "google-chrome",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--no-first-run",
    "--no-default-browser-check",
    "--window-size=1280,720",
    `--user-data-dir=${chromeProfileDir}`,
    `--remote-debugging-port=${DEBUG_PORT}`,
    "about:blank",
  ],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let chromeLogs = "";
chrome.stdout.on("data", (chunk) => {
  chromeLogs += chunk.toString();
});
chrome.stderr.on("data", (chunk) => {
  chromeLogs += chunk.toString();
});

try {
  await waitForServer(APP_URL, "Next dev server");
  await waitForServer(`${DEBUG_URL}/json/version`, "Chrome DevTools");

  const targets = await fetchJson(`${DEBUG_URL}/json/list`);
  const pageTarget = targets.find((target) => target.type === "page");

  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error("Chrome page target를 찾지 못했습니다.");
  }

  const client = await createCdpClient(pageTarget.webSocketDebuggerUrl);

  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("DOM.enable");
  await client.send("Page.navigate", { url: APP_URL });
  await waitFor(async () => {
    const readyState = await evaluate(client, "document.readyState");
    return readyState === "complete";
  }, "initial page load");

  const initialBadge = await text(client, ".count-badge");
  assertEqual(initialBadge, "8", "초기 구독 배지 수");

  await hover(client, '[data-press-id="dailian"]');
  const hoverOpacity = await evaluate(
    client,
    "getComputedStyle(document.querySelector('[data-press-action=\"dailian\"]')).opacity",
  );
  assertEqual(hoverOpacity, "1", "hover 시 구독 버튼 노출");

  await click(client, '[data-press-action="dailian"]');
  await waitFor(async () => (await text(client, ".count-badge")) === "9", "subscribe badge increment");
  assertEqual(await text(client, ".count-badge"), "9", "구독 클릭 후 배지 증가");

  await click(client, '[data-scope-tab="subscribed"]');
  await waitFor(
    async () =>
      (await evaluate(
        client,
        "document.querySelector('[data-scope-tab=\"subscribed\"]')?.getAttribute('aria-selected')",
      )) === "true",
    "subscribed tab selected",
  );
  await waitFor(async () => (await count(client, "[data-press-id]")) === 9, "subscribed tab render");
  assertEqual(await count(client, "[data-press-id]"), 9, "구독 탭 필터 결과");

  await hover(client, '[data-press-id="dailian"]');
  assertEqual(
    await text(client, '[data-press-action="dailian"]'),
    "해지하기",
    "구독 탭 hover 버튼 문구",
  );

  await click(client, '[data-scope-tab="all"]');
  await waitFor(
    async () =>
      (await evaluate(
        client,
        "document.querySelector('[data-scope-tab=\"all\"]')?.getAttribute('aria-selected')",
      )) === "true",
    "all tab selected",
  );
  await waitFor(async () => (await count(client, "[data-press-id]")) === 24, "all tab grid render");

  await click(client, '[data-press-id="sbs-biz"]', { offsetX: 12, offsetY: 12 });
  await waitFor(
    async () => (await count(client, ".list-preview")) === 1,
    "list preview render",
  );
  await waitFor(async () => (await text(client, ".opened-meta strong")) === "SBS Biz", "open sbs biz list view");
  assertEqual(await text(client, ".opened-meta strong"), "SBS Biz", "그리드 셀 클릭으로 리스트 뷰 진입");
  assertEqual(
    await text(client, '[data-category="방송/통신"] b'),
    "1 / 8",
    "방송/통신 카테고리 카운터",
  );

  await click(client, '[data-category="IT"]');
  await waitFor(async () => (await text(client, ".opened-meta strong")) === "아이뉴스24", "switch to IT category");
  assertEqual(await text(client, ".opened-meta strong"), "아이뉴스24", "카테고리 탭 전환");

  await delay(6500);
  await waitFor(
    async () => (await text(client, ".opened-meta strong")) === "ZDNET Korea",
    "auto advance to next IT press",
  );
  assertEqual(await text(client, ".opened-meta strong"), "ZDNET Korea", "6초 자동 진행");

  const screenshot = await client.send("Page.captureScreenshot", {
    captureBeyondViewport: false,
    format: "png",
  });
  await writeFile(SCREENSHOT_PATH, Buffer.from(screenshot.data, "base64"));

  console.log("UI verification passed.");
  for (const item of checks) {
    console.log(`- ${item}`);
  }
  console.log(`Screenshot: ${SCREENSHOT_PATH}`);

  client.close();
} catch (error) {
  console.error("UI verification failed.");
  console.error(error);
  console.error("--- dev logs ---");
  console.error(devLogs);
  console.error("--- chrome logs ---");
  console.error(chromeLogs);
  process.exitCode = 1;
} finally {
  chrome.kill("SIGTERM");
  devServer.kill("SIGTERM");
  await rm(chromeProfileDir, { force: true, recursive: true }).catch(() => {});
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected "${expected}", received "${actual}"`);
  }

  checks.push(`${label} 통과`);
}

async function click(client, selector, offset) {
  const point = await waitForSelector(client, selector, offset);
  await client.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: point.x,
    y: point.y,
    button: "none",
  });
  await client.send("Input.dispatchMouseEvent", {
    type: "mousePressed",
    x: point.x,
    y: point.y,
    button: "left",
    clickCount: 1,
  });
  await client.send("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    x: point.x,
    y: point.y,
    button: "left",
    clickCount: 1,
  });
  await delay(180);
}

async function hover(client, selector) {
  const point = await waitForSelector(client, selector);
  await client.send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: point.x,
    y: point.y,
    button: "none",
  });
  await delay(180);
}

async function waitForSelector(client, selector, offset) {
  return waitFor(async () => {
    const value = await evaluate(
      client,
      `(() => {
        const element = document.querySelector(${JSON.stringify(selector)});
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + ${offset?.offsetX ?? "rect.width / 2"},
          y: rect.top + ${offset?.offsetY ?? "rect.height / 2"},
          width: rect.width,
          height: rect.height
        };
      })()`,
    );

    if (!value || value.width === 0 || value.height === 0) {
      return null;
    }

    return value;
  }, `selector ${selector}`);
}

async function text(client, selector) {
  return evaluate(
    client,
    `(() => document.querySelector(${JSON.stringify(selector)})?.textContent?.replace(/\\s+/g, " ").trim() ?? "")()`,
  );
}

async function count(client, selector) {
  return evaluate(
    client,
    `document.querySelectorAll(${JSON.stringify(selector)}).length`,
  );
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });

  return result.result.value;
}

async function waitFor(callback, label, attempts = 80, interval = 250) {
  for (let index = 0; index < attempts; index += 1) {
    const value = await callback();
    if (value) {
      return value;
    }

    await delay(interval);
  }

  throw new Error(`${label} 대기 시간 초과`);
}

async function waitForServer(url, label) {
  await waitFor(async () => {
    try {
      const response = await fetch(url);
      return response.ok;
    } catch {
      return false;
    }
  }, label);
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

async function createCdpClient(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  const pending = new Map();
  let id = 0;

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener(
      "error",
      (event) => reject(new Error(`WebSocket connection failed: ${event.message}`)),
      { once: true },
    );
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data.toString());
    const resolver = pending.get(message.id);

    if (!resolver) {
      return;
    }

    pending.delete(message.id);

    if (message.error) {
      resolver.reject(new Error(message.error.message));
      return;
    }

    resolver.resolve(message.result);
  });

  return {
    close() {
      socket.close();
    },
    send(method, params = {}) {
      id += 1;
      const messageId = id;

      return new Promise((resolve, reject) => {
        pending.set(messageId, { resolve, reject });
        socket.send(JSON.stringify({ id: messageId, method, params }));
      });
    },
  };
}

async function createTempDir(prefix) {
  const dir = join(tmpdir(), `${prefix}${Date.now()}`);
  await mkdir(dir, { recursive: true });
  return dir;
}
