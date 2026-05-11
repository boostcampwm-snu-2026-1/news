import { describe, expect, it } from 'vitest';
import type { Press } from '@/types/press';
import {
  CELLS_PER_PAGE,
  clampPage,
  getPageCount,
  getPageItems,
  getSubscribedPresses,
} from './pagination';

const press = (id: string): Press => ({
  id,
  name: id,
  category: 'general',
  wordmark: {},
});

describe('getPageCount', () => {
  it('all 탭은 72개 → 3 페이지', () => {
    expect(getPageCount('all', 72, 0)).toBe(3);
  });

  it('sub 탭은 0개 → 1 페이지 (최소 1을 보장해 그리드가 사라지지 않음)', () => {
    expect(getPageCount('sub', 72, 0)).toBe(1);
  });

  it('sub 24개 정확히 → 1 페이지 (경계)', () => {
    expect(getPageCount('sub', 72, 24)).toBe(1);
  });

  it('sub 25개 → 2 페이지', () => {
    expect(getPageCount('sub', 72, 25)).toBe(2);
  });
});

describe('clampPage', () => {
  it('범위 안 page는 그대로', () => {
    expect(clampPage(1, 3)).toBe(1);
  });

  it('pageCount보다 큰 page는 마지막 페이지로 떨어진다', () => {
    expect(clampPage(5, 3)).toBe(2);
  });

  it('음수 page는 0으로 보정', () => {
    expect(clampPage(-1, 3)).toBe(0);
  });

  it('pageCount=0이면 0으로 (방어적)', () => {
    expect(clampPage(2, 0)).toBe(0);
  });
});

describe('getPageItems', () => {
  const items = Array.from({ length: 30 }, (_, i) => press(`p${i}`));

  it('page 0 → 0..23', () => {
    const slice = getPageItems(items, 0);
    expect(slice).toHaveLength(CELLS_PER_PAGE);
    expect(slice[0].id).toBe('p0');
    expect(slice[23].id).toBe('p23');
  });

  it('page 1 → 24..29 (sparse: 길이 6)', () => {
    const slice = getPageItems(items, 1);
    expect(slice).toHaveLength(6);
    expect(slice[0].id).toBe('p24');
  });
});

describe('getSubscribedPresses', () => {
  const all = ['a', 'b', 'c', 'd'].map(press);

  it('정의 순서를 유지한다 (구독 순서가 아니라)', () => {
    const sub = new Set(['c', 'a']);
    expect(getSubscribedPresses(all, sub).map((p) => p.id)).toEqual(['a', 'c']);
  });

  it('빈 Set이면 빈 배열', () => {
    expect(getSubscribedPresses(all, new Set())).toEqual([]);
  });
});
