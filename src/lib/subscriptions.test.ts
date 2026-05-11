import { describe, expect, it } from 'vitest';
import {
  createSubscriptions,
  reduceSubscriptions,
} from './subscriptions';

describe('reduceSubscriptions', () => {
  it('subscribe 시 새 Set을 반환한다 (immutability)', () => {
    const a = createSubscriptions();
    const b = reduceSubscriptions(a, { type: 'subscribe', id: 'p1' });
    expect(a).not.toBe(b);
    expect(b.has('p1')).toBe(true);
    expect(a.has('p1')).toBe(false);
  });

  it('이미 구독 중인 id를 다시 subscribe 하면 같은 reference (no-op)', () => {
    const a = reduceSubscriptions(createSubscriptions(), {
      type: 'subscribe',
      id: 'p1',
    });
    const b = reduceSubscriptions(a, { type: 'subscribe', id: 'p1' });
    expect(b).toBe(a);
  });

  it('unsubscribe 시 Set에서 제거된다', () => {
    const a = reduceSubscriptions(createSubscriptions(), {
      type: 'subscribe',
      id: 'p1',
    });
    const b = reduceSubscriptions(a, { type: 'unsubscribe', id: 'p1' });
    expect(b.has('p1')).toBe(false);
    expect(b.size).toBe(0);
  });

  it('구독하지 않은 id를 unsubscribe 하면 같은 reference (no-op)', () => {
    const a = createSubscriptions();
    const b = reduceSubscriptions(a, { type: 'unsubscribe', id: 'p1' });
    expect(b).toBe(a);
  });

  it('reset은 빈 Set을 반환한다', () => {
    const a = reduceSubscriptions(createSubscriptions(), {
      type: 'subscribe',
      id: 'p1',
    });
    const b = reduceSubscriptions(a, { type: 'reset' });
    expect(b.size).toBe(0);
  });
});
