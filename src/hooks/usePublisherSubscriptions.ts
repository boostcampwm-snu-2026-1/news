import { useState } from 'react'
import { INITIAL_SUBSCRIBED_PUBLISHER_IDS } from '../data/newsStand'
import type { Publisher } from '../types/newsStand'

type PublisherId = Publisher['id']

export function usePublisherSubscriptions(
  initialPublisherIds: readonly PublisherId[] = INITIAL_SUBSCRIBED_PUBLISHER_IDS,
) {
  const [subscribedPublisherIds, setSubscribedPublisherIds] = useState<
    ReadonlySet<PublisherId>
  >(() => new Set<PublisherId>(initialPublisherIds))

  const isPublisherSubscribed = (publisherId: PublisherId) =>
    subscribedPublisherIds.has(publisherId)

  const togglePublisherSubscription = (publisherId: PublisherId) => {
    setSubscribedPublisherIds((currentPublisherIds) => {
      const nextPublisherIds = new Set(currentPublisherIds)

      if (nextPublisherIds.has(publisherId)) {
        nextPublisherIds.delete(publisherId)
      } else {
        nextPublisherIds.add(publisherId)
      }

      return nextPublisherIds
    })
  }

  return {
    isPublisherSubscribed,
    subscribedCount: subscribedPublisherIds.size,
    subscribedPublisherIds,
    togglePublisherSubscription,
  }
}
