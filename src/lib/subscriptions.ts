/**
 * 구독 상태 — Set<pressId> 위에서 동작하는 순수 함수.
 * 테스트 가능성을 위해 컴포넌트 바깥의 lib에 둔다.
 */

export type PressId = string;

export type SubscriptionAction =
  | { type: 'subscribe'; id: PressId }
  | { type: 'unsubscribe'; id: PressId }
  | { type: 'reset' };

export function createSubscriptions(): Set<PressId> {
  return new Set();
}

export function reduceSubscriptions(
  state: Set<PressId>,
  action: SubscriptionAction,
): Set<PressId> {
  switch (action.type) {
    case 'subscribe': {
      if (state.has(action.id)) return state;
      const next = new Set(state);
      next.add(action.id);
      return next;
    }
    case 'unsubscribe': {
      if (!state.has(action.id)) return state;
      const next = new Set(state);
      next.delete(action.id);
      return next;
    }
    case 'reset':
      return new Set();
  }
}
