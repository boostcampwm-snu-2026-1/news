import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabBar } from "./TabBar";

const noop = () => {};

describe("TabBar — a11y / 키보드", () => {
  it("role=tablist 컨테이너 안에 role=tab 두 개가 있다", () => {
    render(
      <TabBar
        activeTab="all"
        subCount={0}
        viewer="grid"
        onTabChange={noop}
        onViewerChange={noop}
      />,
    );
    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
    const tabs = within(tablist).getAllByRole("tab");
    expect(tabs).toHaveLength(2);
  });

  it("activeTab='all' 일 때 '전체 언론사' 가 aria-selected=true, 나머지는 false", () => {
    render(
      <TabBar
        activeTab="all"
        subCount={3}
        viewer="grid"
        onTabChange={noop}
        onViewerChange={noop}
      />,
    );
    const allTab = screen.getByRole("tab", { name: /전체 언론사/ });
    const subTab = screen.getByRole("tab", { name: /내가 구독한 언론사/ });
    expect(allTab).toHaveAttribute("aria-selected", "true");
    expect(subTab).toHaveAttribute("aria-selected", "false");
  });

  it("activeTab='sub' 로 바꾸면 aria-selected 가 반전된다", () => {
    render(
      <TabBar
        activeTab="sub"
        subCount={3}
        viewer="grid"
        onTabChange={noop}
        onViewerChange={noop}
      />,
    );
    const allTab = screen.getByRole("tab", { name: /전체 언론사/ });
    const subTab = screen.getByRole("tab", { name: /내가 구독한 언론사/ });
    expect(allTab).toHaveAttribute("aria-selected", "false");
    expect(subTab).toHaveAttribute("aria-selected", "true");
  });

  it("subCount>0 일 때 배지가 노출되고 aria-label 이 '구독 중인 언론사 N곳'", () => {
    render(
      <TabBar
        activeTab="all"
        subCount={5}
        viewer="grid"
        onTabChange={noop}
        onViewerChange={noop}
      />,
    );
    const badge = screen.getByLabelText("구독 중인 언론사 5곳");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("5");
  });

  it("subCount=0 일 때 배지는 렌더되지 않는다", () => {
    render(
      <TabBar
        activeTab="all"
        subCount={0}
        viewer="grid"
        onTabChange={noop}
        onViewerChange={noop}
      />,
    );
    expect(screen.queryByLabelText(/구독 중인 언론사/)).not.toBeInTheDocument();
  });

  it("탭 클릭 시 onTabChange 가 'all' / 'sub' 인자로 호출된다", async () => {
    const onTabChange = vi.fn();
    render(
      <TabBar
        activeTab="all"
        subCount={2}
        viewer="grid"
        onTabChange={onTabChange}
        onViewerChange={noop}
      />,
    );
    await userEvent.click(screen.getByRole("tab", { name: /전체 언론사/ }));
    await userEvent.click(screen.getByRole("tab", { name: /내가 구독한 언론사/ }));
    expect(onTabChange).toHaveBeenNthCalledWith(1, "all");
    expect(onTabChange).toHaveBeenNthCalledWith(2, "sub");
  });

  it("ViewerButton: aria-label='리스트 뷰' / '그리드 뷰', aria-pressed 가 viewer 와 일치", () => {
    const { rerender } = render(
      <TabBar
        activeTab="all"
        subCount={0}
        viewer="grid"
        onTabChange={noop}
        onViewerChange={noop}
      />,
    );
    const list = screen.getByRole("button", { name: "리스트 뷰" });
    const grid = screen.getByRole("button", { name: "그리드 뷰" });
    expect(list).toHaveAttribute("aria-pressed", "false");
    expect(grid).toHaveAttribute("aria-pressed", "true");

    rerender(
      <TabBar
        activeTab="all"
        subCount={0}
        viewer="list"
        onTabChange={noop}
        onViewerChange={noop}
      />,
    );
    expect(screen.getByRole("button", { name: "리스트 뷰" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "그리드 뷰" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("키보드: 탭에 focus 후 Enter / Space 로 onTabChange 호출", async () => {
    const onTabChange = vi.fn();
    render(
      <TabBar
        activeTab="all"
        subCount={0}
        viewer="grid"
        onTabChange={onTabChange}
        onViewerChange={noop}
      />,
    );
    const subTab = screen.getByRole("tab", { name: /내가 구독한 언론사/ });
    subTab.focus();
    expect(subTab).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    expect(onTabChange).toHaveBeenCalledWith("sub");

    onTabChange.mockClear();
    await userEvent.keyboard(" ");
    expect(onTabChange).toHaveBeenCalledWith("sub");
  });
});
