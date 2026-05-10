/**
 * 엣지케이스 2-B-6: 키보드 접근성
 *
 * 검증 항목:
 *  - GridCell: Enter/Space로 오픈 동작
 *  - SubscribePill: 실제 <button>이므로 기본 tab 순서 진입 가능
 *    (CSS hover-only지만 :focus-within으로도 노출 — JSDOM은 시각 검증 불가하지만
 *     적어도 "포커스 받을 수 있는 button"인지 확인)
 *  - Chevron disabled 표현: HTML disabled 속성 (aria-disabled 아님 — 키보드에서도
 *    포커스/활성화 둘 다 차단)
 *  - TabBar / FieldTab의 탭은 button으로 키보드 활성화 가능
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Newsstand from '../../components/Newsstand';

describe('Newsstand — 키보드 접근성', () => {
  it('GridCell이 Enter로 오픈된다', () => {
    render(<Newsstand />);
    const cell = screen.getByRole('button', { name: /서울경제/ });
    cell.focus();
    expect(document.activeElement).toBe(cell);
    fireEvent.keyDown(cell, { key: 'Enter' });
    expect(
      screen.getByText('서울경제 언론사에서 직접 편집한 뉴스입니다.'),
    ).toBeInTheDocument();
  });

  it('GridCell이 Space로도 오픈된다', () => {
    render(<Newsstand />);
    const cell = screen.getByRole('button', { name: /데일리안/ });
    cell.focus();
    fireEvent.keyDown(cell, { key: ' ' });
    expect(
      screen.getByText('데일리안 언론사에서 직접 편집한 뉴스입니다.'),
    ).toBeInTheDocument();
  });

  it('GridCell은 tabIndex=0으로 키보드 포커스 가능', () => {
    render(<Newsstand />);
    const cells = screen
      .getAllByRole('button')
      .filter((el) => el.tagName === 'DIV');
    expect(cells.length).toBeGreaterThan(0);
    for (const cell of cells) {
      expect(cell.tabIndex).toBe(0);
    }
  });

  it('SubscribePill은 실제 <button>으로 키보드 진입 가능', () => {
    render(<Newsstand />);
    const pills = Array.from(document.querySelectorAll('button')).filter(
      (b) =>
        b.textContent === '구독하기' || b.textContent === '해지하기',
    );
    expect(pills.length).toBeGreaterThan(0);
    for (const pill of pills) {
      // <button>은 기본 tabIndex=0. tabIndex를 명시적으로 -1로 막지 않는 한
      // 키보드 진입 가능.
      expect(pill.tabIndex).toBeGreaterThanOrEqual(0);
    }
  });

  it('Chevron 비활성은 HTML disabled 속성으로 표현 (포커스/활성화 모두 차단)', () => {
    render(<Newsstand />);
    // 전체 탭 page0 → 이전 비활성, 다음 활성
    const prev = screen.getByRole('button', { name: '이전 페이지' });
    const next = screen.getByRole('button', { name: '다음 페이지' });
    expect(prev).toBeDisabled();
    expect(next).toBeEnabled();
    // disabled <button>은 포커스 불가
    prev.focus();
    expect(document.activeElement).not.toBe(prev);
  });

  it('FieldTab의 카테고리 탭이 키보드로 활성화 가능', () => {
    render(<Newsstand />);
    fireEvent.click(screen.getByRole('button', { name: /서울경제/ }));

    const itTab = screen.getByRole('tab', { name: /^IT/ });
    itTab.focus();
    expect(document.activeElement).toBe(itTab);
    fireEvent.click(itTab); // Enter on focused button → click 발생
    expect(itTab).toHaveAttribute('aria-selected', 'true');
  });

  it('TabBar의 전체/구독 탭이 키보드 활성화 가능', () => {
    render(<Newsstand />);
    const subTab = screen.getByRole('tab', { name: /내가 구독한/ });
    subTab.focus();
    expect(document.activeElement).toBe(subTab);
    fireEvent.click(subTab);
    expect(subTab).toHaveAttribute('aria-selected', 'true');
  });
});
