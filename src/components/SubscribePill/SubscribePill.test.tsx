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
