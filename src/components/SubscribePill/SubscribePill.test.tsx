import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubscribePill } from "./SubscribePill";

describe("SubscribePill", () => {
  it("renders subscribe label", () => {
    render(<SubscribePill mode="subscribe" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "구독하기" })).toBeInTheDocument();
  });

  it("renders unsubscribe label", () => {
    render(<SubscribePill mode="unsubscribe" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "해지하기" })).toBeInTheDocument();
  });

  it("calls onClick and stops propagation", async () => {
    const onClick = vi.fn();
    const onParentClick = vi.fn();
    render(
      <div onClick={onParentClick}>
        <SubscribePill mode="subscribe" onClick={onClick} />
      </div>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
    expect(onParentClick).not.toHaveBeenCalled();
  });
});

describe("SubscribePill — a11y / 키보드", () => {
  it("aria-label 이 mode 에 따라 '구독하기' / '해지하기'", () => {
    const { rerender } = render(
      <SubscribePill mode="subscribe" onClick={() => {}} />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "구독하기");

    rerender(<SubscribePill mode="unsubscribe" onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "해지하기");
  });

  it("키보드 Enter → onClick 호출", async () => {
    const onClick = vi.fn();
    render(<SubscribePill mode="subscribe" onClick={onClick} />);
    const btn = screen.getByRole("button", { name: "구독하기" });
    btn.focus();
    expect(btn).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("키보드 Space → onClick 호출", async () => {
    const onClick = vi.fn();
    render(<SubscribePill mode="unsubscribe" onClick={onClick} />);
    const btn = screen.getByRole("button", { name: "해지하기" });
    btn.focus();
    expect(btn).toHaveFocus();
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledOnce();
  });
});
