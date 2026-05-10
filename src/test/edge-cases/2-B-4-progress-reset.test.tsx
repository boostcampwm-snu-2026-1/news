/**
 * 엣지케이스 2-B-4: progress 도중 카테고리 수동 전환 → 진행도 0 리셋
 *
 * 검증 항목:
 *  - PressOpen 진입 시 active FieldTab의 progressFill scaleX = 0에서 시작
 *  - 100ms tick × N으로 진행도 누적
 *  - 다른 카테고리 클릭 시: progress=0 리셋, currentInTab=1 리셋,
 *    interval은 재시작되어 새 카테고리에서 다시 진행
 *
 * 주의: vi.useFakeTimers + userEvent 조합은 unstable. fireEvent로 동기 클릭.
 */
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Newsstand from '../../components/Newsstand';

function progressScale(activeTab: HTMLElement): number {
  const fill = activeTab.querySelector('span[style*="scaleX"]') as HTMLElement;
  if (!fill) return 0;
  const m = fill.style.transform.match(/scaleX\(([\d.]+)\)/);
  return m ? parseFloat(m[1]) : 0;
}

const FIELD_KEY_RE =
  /종합\/경제|방송\/통신|IT|스포츠\/연예|매거진\/전문지|지역/;

function activeFieldTab(): HTMLElement {
  const tabs = screen.getAllByRole('tab', { selected: true });
  return tabs.find((t) => FIELD_KEY_RE.test(t.textContent ?? '')) as HTMLElement;
}

describe('Newsstand — progress 리셋', () => {
  it('카테고리 수동 전환 시 progress=0, currentInTab=1로 리셋', () => {
    vi.useFakeTimers();
    render(<Newsstand />);

    // 서울경제(p01, 종합/경제 카테고리) 오픈
    fireEvent.click(screen.getByRole('button', { name: /서울경제/ }));

    let active = activeFieldTab();
    expect(active.textContent).toMatch(/종합\/경제/);
    expect(progressScale(active)).toBe(0);
    expect(active.textContent).toMatch(/1\s*\/\s*81/);

    // 3000ms 진행 → progress ≈ 0.5
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    active = activeFieldTab();
    const mid = progressScale(active);
    expect(mid).toBeGreaterThan(0.4);
    expect(mid).toBeLessThan(0.6);

    // IT 카테고리로 수동 전환
    fireEvent.click(screen.getByRole('tab', { name: /^IT/ }));

    active = activeFieldTab();
    expect(active.textContent).toMatch(/^IT/);
    expect(progressScale(active)).toBe(0);
    expect(active.textContent).toMatch(/1\s*\/\s*81/);

    // 새 카테고리에서 interval 재가동
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    active = activeFieldTab();
    const after = progressScale(active);
    expect(after).toBeGreaterThan(0.2);
    expect(after).toBeLessThan(0.5);
  });

  it('progress가 6초 누적되면 currentInTab이 1 증가', () => {
    vi.useFakeTimers();
    render(<Newsstand />);

    fireEvent.click(screen.getByRole('button', { name: /서울경제/ }));

    let active = activeFieldTab();
    expect(active.textContent).toMatch(/1\s*\/\s*81/);

    // 6초 정확히 진행 → currentInTab 1 → 2
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    active = activeFieldTab();
    expect(active.textContent).toMatch(/2\s*\/\s*81/);
    expect(progressScale(active)).toBe(0); // progress 리셋
  });
});
