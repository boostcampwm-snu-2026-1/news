import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'logos');

const presses = [
  { name: "조선일보",       file: "chosun.png",          url: "https://www.chosun.com" },
  { name: "중앙일보",       file: "joongang.png",         url: "https://www.joongang.co.kr" },
  { name: "동아일보",       file: "donga.png",            url: "https://www.donga.com" },
  { name: "한국일보",       file: "hankook.png",          url: "https://www.hankookilbo.com" },
  { name: "경향신문",       file: "khan.png",             url: "https://www.khan.co.kr" },
  { name: "한겨레",         file: "hani.png",             url: "https://www.hani.co.kr" },
  { name: "서울신문",       file: "seoul.png",            url: "https://www.seoul.co.kr" },
  { name: "국민일보",       file: "kmib.png",             url: "https://www.kmib.co.kr" },
  { name: "세계일보",       file: "segye.png",            url: "https://www.segye.com" },
  { name: "문화일보",       file: "munhwa.png",           url: "https://www.munhwa.com" },
  { name: "매일경제",       file: "mk.png",               url: "https://www.mk.co.kr" },
  { name: "한국경제",       file: "hankyung.png",         url: "https://www.hankyung.com" },
  { name: "서울경제",       file: "sedaily.png",          url: "https://www.sedaily.com" },
  { name: "헤럴드경제",     file: "herald.png",           url: "https://biz.heraldcorp.com" },
  { name: "파이낸셜뉴스",   file: "fnnews.png",           url: "https://www.fnnews.com" },
  { name: "아시아경제",     file: "asiae.png",            url: "https://www.asiae.co.kr" },
  { name: "머니투데이",     file: "mt.png",               url: "https://www.mt.co.kr" },
  { name: "이데일리",       file: "edaily.png",           url: "https://www.edaily.co.kr" },
  { name: "뉴시스",         file: "newsis.png",           url: "https://www.newsis.com" },
  { name: "연합뉴스",       file: "yna.png",              url: "https://www.yna.co.kr" },
  { name: "YTN",            file: "ytn.png",              url: "https://www.ytn.co.kr" },
  { name: "MBC",            file: "mbc.png",              url: "https://www.mbc.co.kr" },
  { name: "KBS",            file: "kbs.png",              url: "https://www.kbs.co.kr" },
  { name: "SBS",            file: "sbs.png",              url: "https://news.sbs.co.kr" },
  { name: "JTBC",           file: "jtbc.png",             url: "https://news.jtbc.co.kr" },
  { name: "TV조선",         file: "tvchosun.png",         url: "https://news.tvchosun.com" },
  { name: "채널A",          file: "channela.png",         url: "https://www.ichannela.com" },
  { name: "MBN",            file: "mbn.png",              url: "https://www.mbn.co.kr" },
  { name: "연합뉴스TV",     file: "yonhapnewstv.png",     url: "https://www.yonhapnewstv.co.kr" },
  { name: "OBS",            file: "obs.png",              url: "https://www.obs.co.kr" },
  { name: "부산일보",       file: "busan.png",            url: "https://www.busan.com" },
  { name: "대구일보",       file: "idaegu.png",           url: "https://www.idaegu.com" },
  { name: "광주일보",       file: "kwangju.png",          url: "https://www.kwangju.co.kr" },
  { name: "전북일보",       file: "jjan.png",             url: "https://www.jjan.kr" },
  { name: "제주일보",       file: "jejunews.png",         url: "https://www.jejunews.com" },
  { name: "강원일보",       file: "kwnews.png",           url: "https://www.kwnews.co.kr" },
  { name: "충청일보",       file: "ccdailynews.png",      url: "https://www.ccdailynews.com" },
  { name: "경북일보",       file: "kyongbuk.png",         url: "https://www.kyongbuk.co.kr" },
  { name: "경남신문",       file: "knnews.png",           url: "https://www.knnews.co.kr" },
  { name: "울산매일",       file: "iusm.png",             url: "https://www.iusm.co.kr" },
  { name: "뉴스1",          file: "news1.png",            url: "https://www.news1.kr" },
  { name: "뉴스핌",         file: "newspim.png",          url: "https://www.newspim.com" },
  { name: "데일리안",       file: "dailian.png",          url: "https://www.dailian.co.kr" },
  { name: "프레시안",       file: "pressian.png",         url: "https://www.pressian.com" },
  { name: "오마이뉴스",     file: "ohmynews.png",         url: "https://www.ohmynews.com" },
  { name: "미디어오늘",     file: "mediatoday.png",       url: "https://www.mediatoday.co.kr" },
  { name: "노컷뉴스",       file: "nocutnews.png",        url: "https://www.nocutnews.co.kr" },
  { name: "위키트리",       file: "wikitree.png",         url: "https://www.wikitree.co.kr" },
  { name: "인사이트",       file: "insight.png",          url: "https://www.insight.co.kr" },
  { name: "더팩트",         file: "thefact.png",          url: "https://thefact.co.kr" },
  { name: "조세일보",       file: "joseilbo.png",         url: "https://www.joseilbo.com" },
  { name: "비즈니스포스트", file: "businesspost.png",     url: "https://www.businesspost.co.kr" },
  { name: "디지털타임스",   file: "dt.png",               url: "https://www.dt.co.kr" },
  { name: "전자신문",       file: "etnews.png",           url: "https://www.etnews.com" },
  { name: "ZDNet Korea",    file: "zdnet.png",            url: "https://zdnet.co.kr" },
  { name: "블로터",         file: "bloter.png",           url: "https://www.bloter.net" },
  { name: "테크크런치",     file: "techcrunch.png",       url: "https://techcrunch.com" },
  { name: "IT동아",         file: "itdonga.png",          url: "https://it.donga.com" },
  { name: "아이뉴스24",     file: "inews24.png",          url: "https://www.inews24.com" },
  { name: "디지털데일리",   file: "ddaily.png",           url: "https://www.ddaily.co.kr" },
  { name: "스포츠조선",     file: "sportschosun.png",     url: "https://www.sportschosun.com" },
  { name: "스포츠서울",     file: "sportsseoul.png",      url: "https://www.sportsseoul.com" },
  { name: "스포츠동아",     file: "sportsdonga.png",      url: "https://sports.donga.com" },
  { name: "일간스포츠",     file: "isplus.png",           url: "https://isplus.com" },
  { name: "엑스포츠뉴스",   file: "xportsnews.png",       url: "https://www.xportsnews.com" },
  { name: "마이데일리",     file: "mydaily.png",          url: "https://www.mydaily.co.kr" },
  { name: "스타뉴스",       file: "starnewskorea.png",    url: "https://www.starnewskorea.com" },
  { name: "텐아시아",       file: "tenasia.png",          url: "https://tenasia.hankyung.com" },
  { name: "한류TV서울",     file: "hltvseoul.png",        url: "https://www.hltvseoul.com" },
  { name: "씨네21",         file: "cine21.png",           url: "https://www.cine21.com" },
  { name: "국방일보",       file: "kookbang.png",         url: "https://kookbang.dema.mil.kr" },
  { name: "농민신문",       file: "nongmin.png",          url: "https://www.nongmin.com" },
  { name: "의사신문",       file: "doctorstimes.png",     url: "https://www.doctorstimes.com" },
  { name: "법률신문",       file: "lawtimes.png",         url: "https://www.lawtimes.co.kr" },
  { name: "교육신문",       file: "hangyo.png",           url: "https://www.hangyo.com" },
  { name: "한국대학신문",   file: "unn.png",              url: "https://news.unn.net" },
  { name: "대학내일",       file: "univ20.png",           url: "https://univ20.com" },
  { name: "시사IN",         file: "sisain.png",           url: "https://www.sisain.co.kr" },
  { name: "주간동아",       file: "donga-week.png",       url: "https://weekly.donga.com" },
  { name: "시사저널",       file: "sisajournal.png",      url: "https://www.sisajournal.com" },
  { name: "한국경제TV",     file: "wowtv.png",            url: "https://www.wowtv.co.kr" },
  { name: "서울파이낸스",   file: "seoulfn.png",          url: "https://www.seoulfn.com" },
  { name: "비즈워치",       file: "bizwatch.png",         url: "https://news.bizwatch.co.kr" },
  { name: "인베스트조선",   file: "investchosun.png",     url: "https://www.investchosun.com" },
  { name: "조선비즈",       file: "chosunbiz.png",        url: "https://biz.chosun.com" },
  { name: "중앙SUNDAY",     file: "joongangsunday.png",   url: "https://www.joongang.co.kr/sunday" },
  { name: "코리아타임스",   file: "koreatimes.png",       url: "https://www.koreatimes.co.kr" },
  { name: "코리아헤럴드",   file: "koreaherald.png",      url: "https://www.koreaherald.com" },
  { name: "아리랑TV",       file: "arirang.png",          url: "https://www.arirang.com" },
  { name: "KBS World",      file: "kbsworld.png",         url: "https://world.kbs.co.kr" },
  { name: "TBS",            file: "tbs.png",              url: "https://www.tbs.seoul.kr" },
  { name: "CBS",            file: "cbs.png",              url: "https://www.cbs.co.kr" },
  { name: "BBS",            file: "bbs.png",              url: "https://www.bbsi.co.kr" },
  { name: "WBS",            file: "wbs.png",              url: "https://www.wbs.co.kr" },
  { name: "CBS노컷뉴스",    file: "cbsnews.png",          url: "https://www.cbsnews.co.kr" },
  { name: "동양경제",       file: "dycj.png",             url: "https://www.dycj.co.kr" },
  { name: "소비자경제",     file: "economyplus.png",      url: "https://www.economyplus.co.kr" },
  { name: "에너지경제",     file: "ekn.png",              url: "https://www.ekn.kr" },
  { name: "환경일보",       file: "hkbs.png",             url: "https://www.hkbs.co.kr" },
  { name: "그린포스트코리아", file: "greenpostkorea.png", url: "https://www.greenpostkorea.co.kr" },
];

function extractDomain(url) {
  return new URL(url).hostname.replace(/^www\./, '');
}

function fetchUrl(url, destPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('too many redirects'));

    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        res.resume();
        return fetchUrl(res.headers.location, destPath, redirectCount + 1)
          .then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => { fs.unlink(destPath, () => {}); reject(err); });
    });

    req.on('error', reject);
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function downloadLogo(press) {
  const destPath = path.join(OUTPUT_DIR, press.file);

  if (fs.existsSync(destPath)) {
    console.log(`[SKIP] ${press.name}`);
    return;
  }

  const domain = extractDomain(press.url);

  // 1차: Clearbit (고품질 기업 로고)
  try {
    await fetchUrl(`https://logo.clearbit.com/${domain}`, destPath);
    console.log(`[OK  ] ${press.name}  →  Clearbit`);
    return;
  } catch {}

  // 2차: Google Favicon (항상 존재)
  try {
    const faviconUrl = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(press.url)}&sz=128`;
    await fetchUrl(faviconUrl, destPath);
    console.log(`[OK  ] ${press.name}  →  favicon`);
  } catch (err) {
    console.log(`[FAIL] ${press.name}: ${err.message}`);
  }
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
console.log(`저장 위치: ${OUTPUT_DIR}\n`);

let ok = 0, fail = 0;
for (const press of presses) {
  await downloadLogo(press);
  await new Promise(r => setTimeout(r, 150)); // 서버 부하 방지
}

console.log(`\n완료!`);
