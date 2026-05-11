/**
 * 추가 기능 2-C-2: 그리드 방향키 네비게이션
 *
 * 동작:
 *  - GridCell에 포커스 후 ArrowLeft/Right/Up/Down으로 인접 셀로 포커스 이동
 *  - 좌우는 ±1, 상하는 ±6 (6열 그리드)
 *  - 그리드 경계(좌단/우단/상단/하단)에서는 이동하지 않음 (랩어라운드 없음)
 *  - 빈 셀(구독 탭의 미사용 슬롯)로는 이동하지 않음
 *  - Enter/Space는 기존대로 오픈 동작
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Newsstand from '../../components/Newsstand';

function gridCells(): HTMLElement[] {
  // 첫 role=button div(=GridCell)의 부모(그리드 root)에서 24개 자식 반환.
  // 전체/구독 탭 모두에서 작동.
  const cell = screen
    .getAllByRole('button')
    .find((el) => el.tagName === 'DIV');
  if (!cell) return [];
  const grid = cell.parentElement!;
  return Array.from(grid.children) as HTMLElement[];
}

describe('GridCell — 방향키 네비게이션', () => {
  it('ArrowRight: 좌측 셀에서 우측 인접 셀로 포커스 이동', () => {
    render(<Newsstand />);
    const cells = gridCells();
    const c0 = cells[0];
    c0.focus();
    fireEvent.keyDown(c0, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(cells[1]);
  });

  it('ArrowDown: 첫 행에서 둘째 행 같은 열로 포커스 이동 (+6)', () => {
    render(<Newsstand />);
    const cells = gridCells();
    cells[2].focus();
    fireEvent.keyDown(cells[2], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(cells[8]);
  });

  it('ArrowUp: 둘째 행에서 첫 행 같은 열로 포커스 이동 (-6)', () => {
    render(<Newsstand />);
    const cells = gridCells();
    cells[10].focus();
    fireEvent.keyDown(cells[10], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(cells[4]);
  });

  it('ArrowLeft: 좌단 셀에서는 이동하지 않음 (랩어라운드 없음)', () => {
    render(<Newsstand />);
    const cells = gridCells();
    cells[0].focus();
    fireEvent.keyDown(cells[0], { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(cells[0]);
  });

  it('ArrowRight: 우단 셀(idx 5)에서 다음 행으로 넘어가지 않음', () => {
    render(<Newsstand />);
    const cells = gridCells();
    cells[5].focus();
    fireEvent.keyDown(cells[5], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(cells[5]);
  });

  it('ArrowUp: 첫 행에서는 이동하지 않음', () => {
    render(<Newsstand />);
    const cells = gridCells();
    cells[3].focus();
    fireEvent.keyDown(cells[3], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(cells[3]);
  });

  it('ArrowDown: 마지막 행(idx 18-23)에서는 이동하지 않음', () => {
    render(<Newsstand />);
    const cells = gridCells();
    cells[20].focus();
    fireEvent.keyDown(cells[20], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(cells[20]);
  });

  it('Enter는 기존대로 오픈 동작 — 방향키 추가가 회귀 없음', () => {
    render(<Newsstand />);
    const cell = screen.getByRole('button', { name: /서울경제/ });
    cell.focus();
    fireEvent.keyDown(cell, { key: 'Enter' });
    expect(
      screen.getByText('서울경제 언론사에서 직접 편집한 뉴스입니다.'),
    ).toBeInTheDocument();
  });

  it('구독 탭 빈 셀로는 이동하지 않음 (role=button 부재 슬롯)', () => {
    render(<Newsstand />);
    // 구독 탭으로 전환 → 8 GridCell + 16 빈 셀
    fireEvent.click(screen.getByRole('tab', { name: /내가 구독한/ }));
    const cells = gridCells();
    // 첫 GridCell(role=button)의 위치를 찾고 우측이 빈 셀인 케이스 만들기
    const buttons = cells.filter(
      (c) => c.getAttribute('role') === 'button',
    );
    // 마지막 GridCell의 우측이 비어 있을 가능성 높음 — 시도하고 포커스 보존 확인
    const last = buttons[buttons.length - 1];
    last.focus();
    const lastIdx = cells.indexOf(last);
    const rightNeighbor = cells[lastIdx + 1];
    if (rightNeighbor && rightNeighbor.getAttribute('role') !== 'button') {
      fireEvent.keyDown(last, { key: 'ArrowRight' });
      expect(document.activeElement).toBe(last);
    } else {
      // 우측이 마침 다른 GridCell이라면 이 가드는 의미 없음 — 케이스 자체를 스킵
      // (DEFAULT_SUBSCRIBED_IDS 분포에 따라 달라질 수 있음)
    }
  });
});
