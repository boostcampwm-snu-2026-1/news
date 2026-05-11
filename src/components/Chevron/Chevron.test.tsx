import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { PointerEventsCheckLevel } from "@testing-library/user-event";
import { Chevron } from "./Chevron";

describe("Chevron — a11y / 키보드", () => {
  it("dir='left' 면 aria-label='이전 페이지', dir='right' 면 '다음 페이지'", () => {
    const { rerender } = render(
      <Chevron dir="left" disabled={false} onClick={() => {}} />,
    );
    expect(screen.getByRole("button", { name: "이전 페이지" })).toBeInTheDocument();

    rerender(<Chevron dir="right" disabled={false} onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "다음 페이지" })).toBeInTheDocument();
  });

  it("disabled=true → 버튼 disabled 속성, click 해도 onClick 호출 안 됨", async () => {
    const onClick = vi.fn();
    render(<Chevron dir="left" disabled={true} onClick={onClick} />);
    const btn = screen.getByRole("button", { name: "이전 페이지" });
    expect(btn).toBeDisabled();
    // disabled 버튼은 pointer-events: none — user-event 의 가드를 끄고
    // 실제로 클릭 이벤트가 디스패치되지 않는지 확인한다.
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("disabled=false → click 시 onClick 호출", async () => {
    const onClick = vi.fn();
    render(<Chevron dir="right" disabled={false} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "다음 페이지" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("키보드: focus 후 Enter / Space → onClick 호출", async () => {
    const onClick = vi.fn();
    render(<Chevron dir="right" disabled={false} onClick={onClick} />);
    const btn = screen.getByRole("button", { name: "다음 페이지" });
    btn.focus();
    expect(btn).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);

    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
