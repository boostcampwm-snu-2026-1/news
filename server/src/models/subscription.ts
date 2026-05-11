import type { Collection } from 'mongodb'
import { getDb } from '../db/mongo.js'
import type { Publisher } from '../types/newsStand.js'

const SUBSCRIPTIONS_COLLECTION = 'subscriptions'

export interface SubscriptionDocument {
  _id: string
  clientId: string
  publisherIds?: string[]
  updatedAt: Date
}

export async function getSubscriptionCollection(): Promise<
  Collection<SubscriptionDocument>
> {
  const db = await getDb()

  return db.collection<SubscriptionDocument>(SUBSCRIPTIONS_COLLECTION)
}

export async function getSubscribedPublisherIds(
  clientId: string,
): Promise<Publisher['id'][]> {
  const collection = await getSubscriptionCollection()
  const subscription = await collection.findOne({ _id: clientId })

  return subscription?.publisherIds ?? []
}

export async function updatePublisherSubscription({
  clientId,
  publisherId,
  subscribed,
}: {
  clientId: string
  publisherId: Publisher['id']
  subscribed: boolean
}): Promise<Publisher['id'][]> {
  const collection = await getSubscriptionCollection()

  if (subscribed) {
    await collection.updateOne(
      { _id: clientId },
      {
        $addToSet: { publisherIds: publisherId },
        $set: {
          clientId,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )
  } else {
    await collection.updateOne(
      { _id: clientId },
      {
        $pull: { publisherIds: publisherId },
        $set: {
          clientId,
          updatedAt: new Date(),
        },
      },
    )
  }

  return getSubscribedPublisherIds(clientId)
}
