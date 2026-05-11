import { useCallback, useReducer } from 'react';
import {
  createSubscriptions,
  reduceSubscriptions,
  type PressId,
  type SubscriptionAction,
} from '@/lib/subscriptions';

/**
 * 구독 상태를 관리하는 hook.
 * 내부적으로 useReducer를 쓰지만 컴포넌트에는 동작 단위 메서드를 노출한다.
 */
export function useSubscriptions() {
  const [subscribed, dispatch] = useReducer(
    reduceSubscriptions,
    undefined,
    createSubscriptions,
  );

  const subscribe = useCallback((id: PressId) => {
    dispatch({ type: 'subscribe', id } satisfies SubscriptionAction);
  }, []);

  const unsubscribe = useCallback((id: PressId) => {
    dispatch({ type: 'unsubscribe', id } satisfies SubscriptionAction);
  }, []);

  const isSubscribed = useCallback(
    (id: PressId) => subscribed.has(id),
    [subscribed],
  );

  return { subscribed, subscribe, unsubscribe, isSubscribed };
}
