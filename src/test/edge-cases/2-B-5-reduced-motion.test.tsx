/**
 * 엣지케이스 2-B-5: prefers-reduced-motion 적용 시 ticker · progress 모두 비활성
 *
 * 검증 항목:
 *  - matchMedia가 reduce를 반환하면 Newsstand의 progress effect가 early-return
 *    → 6초 진행해도 progress=0, currentInTab=1 고정
 *  - Ticker의 useLaneIndex effect도 early-return → 시간이 지나도 첫 아이템 활성 유지
 *  - 사용자 클릭(카테고리 전환)으로는 여전히 상태 변경 가능
 */
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Newsstand from '../../components/Newsstand';

const FIELD_KEY_RE =
  /종합\/경제|방송\/통신|IT|스포츠\/연예|매거진\/전문지|지역/;

function progressScale(tab: HTMLElement): number {
  const fill = tab.querySelector('span[style*="scaleX"]') as HTMLElement;
  if (!fill) return 0;
  const m = fill.style.transform.match(/scaleX\(([\d.]+)\)/);
  return m ? parseFloat(m[1]) : 0;
}

function activeFieldTab(): HTMLElement {
  return screen
    .getAllByRole('tab', { selected: true })
    .find((t) => FIELD_KEY_RE.test(t.textContent ?? '')) as HTMLElement;
}

function activeTickerItems(): Element[] {
  // Ticker의 active item은 aria-hidden 속성이 없는 .item.
  // setup.ts의 기본 폴리필이 만든 div들은 다 동일 구조라
  // ticker root의 lane > item 중 aria-hidden=null 인 것만 추림.
  return Array.from(
    document.querySelectorAll('[class*="lane"] > [class*="item"]'),
  ).filter((el) => !el.hasAttribute('aria-hidden'));
}

describe('Newsstand — prefers-reduced-motion', () => {
  beforeEach(() => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }));
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reduce-motion: progress interval 미가동 (시간 진행해도 progress=0)', () => {
    vi.useFakeTimers();
    render(<Newsstand />);
    fireEvent.click(screen.getByRole('button', { name: /서울경제/ }));

    let active = activeFieldTab();
    expect(progressScale(active)).toBe(0);
    expect(active.textContent).toMatch(/1\s*\/\s*81/);

    // 10초 진행해도 변화 없음
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    active = activeFieldTab();
    expect(progressScale(active)).toBe(0);
    expect(active.textContent).toMatch(/1\s*\/\s*81/);
  });

  it('reduce-motion: 사용자가 직접 카테고리 클릭은 여전히 가능', () => {
    render(<Newsstand />);
    fireEvent.click(screen.getByRole('button', { name: /서울경제/ }));

    expect(activeFieldTab().textContent).toMatch(/종합\/경제/);

    fireEvent.click(screen.getByRole('tab', { name: /^IT/ }));
    expect(activeFieldTab().textContent).toMatch(/^IT/);
  });

  it('reduce-motion: Ticker가 회전하지 않고 초기 아이템만 활성', () => {
    vi.useFakeTimers();
    render(<Newsstand />);

    // 초기 active = 각 레인의 첫 아이템 (총 2개)
    const before = activeTickerItems();
    expect(before).toHaveLength(2);
    const beforeText = before.map((el) => el.textContent);

    // 10초 진행해도 회전 없음
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    const after = activeTickerItems();
    expect(after).toHaveLength(2);
    expect(after.map((el) => el.textContent)).toEqual(beforeText);
  });
});
