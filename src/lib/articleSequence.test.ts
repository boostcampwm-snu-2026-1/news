import { describe, expect, it } from 'vitest';
import { CATEGORY_ORDER, type CategoryKey } from '@/types/press';
import { jumpToTab, nextCursor, progressRatio } from './articleSequence';

const fullCounts: Record<CategoryKey, number> = {
  general: 7,
  broadcast: 7,
  it: 7,
  sports: 7,
  magazine: 7,
  local: 7,
};

describe('nextCursor', () => {
  it('탭 안에서는 index 증가', () => {
    expect(
      nextCursor({ tab: 'general', index: 2 }, fullCounts),
    ).toEqual({ tab: 'general', index: 3 });
  });

  it('탭 마지막 → 다음 탭의 0번', () => {
    expect(
      nextCursor({ tab: 'general', index: 6 }, fullCounts),
    ).toEqual({ tab: 'broadcast', index: 0 });
  });

  it('마지막 탭의 마지막 → 첫 탭으로 wrap', () => {
    expect(
      nextCursor({ tab: 'local', index: 6 }, fullCounts),
    ).toEqual({ tab: 'general', index: 0 });
  });

  it('비어있는 탭은 건너뛴다', () => {
    const counts = { ...fullCounts, broadcast: 0 };
    expect(
      nextCursor({ tab: 'general', index: 6 }, counts),
    ).toEqual({ tab: 'it', index: 0 });
  });

  it('모든 탭이 비면 cursor 그대로 (loop 보호)', () => {
    const counts: Record<CategoryKey, number> = {
      general: 0,
      broadcast: 0,
      it: 0,
      sports: 0,
      magazine: 0,
      local: 0,
    };
    const cur = { tab: 'general' as CategoryKey, index: 0 };
    expect(nextCursor(cur, counts)).toBe(cur);
  });
});

describe('jumpToTab', () => {
  it('주어진 탭의 0번으로 이동', () => {
    for (const k of CATEGORY_ORDER) {
      expect(jumpToTab(k)).toEqual({ tab: k, index: 0 });
    }
  });
});

describe('progressRatio', () => {
  it('elapsed 0 → 0', () => {
    expect(progressRatio(0, 6000)).toBe(0);
  });
  it('elapsed = duration → 1', () => {
    expect(progressRatio(6000, 6000)).toBe(1);
  });
  it('elapsed > duration → 1로 clamp', () => {
    expect(progressRatio(7000, 6000)).toBe(1);
  });
  it('중간값 → 비율', () => {
    expect(progressRatio(3000, 6000)).toBe(0.5);
  });
  it('음수 elapsed → 0', () => {
    expect(progressRatio(-100, 6000)).toBe(0);
  });
});
