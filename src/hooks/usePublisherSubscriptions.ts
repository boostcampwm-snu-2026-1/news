import { useState } from 'react'
import type { Publisher } from '../types/newsStand'

type PublisherId = Publisher['id']

interface UsePublisherSubscriptionsOptions {
  initialPublisherIds: readonly PublisherId[]
  onUpdatePublisherSubscription?: (
    publisherId: PublisherId,
    subscribed: boolean,
  ) => Promise<readonly PublisherId[]>
}

export function usePublisherSubscriptions({
  initialPublisherIds,
  onUpdatePublisherSubscription,
}: UsePublisherSubscriptionsOptions) {
  const [subscribedPublisherIds, setSubscribedPublisherIds] = useState<
    ReadonlySet<PublisherId>
  >(() => new Set<PublisherId>(initialPublisherIds))
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null)

  const isPublisherSubscribed = (publisherId: PublisherId) =>
    subscribedPublisherIds.has(publisherId)

  const togglePublisherSubscription = (publisherId: PublisherId) => {
    const subscribed = !subscribedPublisherIds.has(publisherId)

    setSubscriptionError(null)

    if (!onUpdatePublisherSubscription) {
      setSubscribedPublisherIds((currentPublisherIds) => {
        const nextPublisherIds = new Set(currentPublisherIds)

        if (subscribed) {
          nextPublisherIds.add(publisherId)
        } else {
          nextPublisherIds.delete(publisherId)
        }

        return nextPublisherIds
      })
      return
    }

    void onUpdatePublisherSubscription(publisherId, subscribed)
      .then((publisherIds) => {
        setSubscribedPublisherIds(new Set<PublisherId>(publisherIds))
      })
      .catch((error: unknown) => {
        setSubscriptionError(
          error instanceof Error
            ? error.message
            : '구독 상태를 저장하지 못했습니다.',
        )
      })
  }

  return {
    isPublisherSubscribed,
    subscriptionError,
    subscribedCount: subscribedPublisherIds.size,
    subscribedPublisherIds,
    togglePublisherSubscription,
  }
}
