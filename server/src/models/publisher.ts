import type { Collection } from 'mongodb'
import { getDb } from '../db/mongo.js'
import type { Article, Publisher, WordmarkStyle } from '../types/newsStand.js'

const PUBLISHERS_COLLECTION = 'publishers'

export interface PublisherDocument {
  _id: string
  order: number
  name: string
  category: Publisher['category']
  wordmark: WordmarkStyle
  editedAt: string
  articles: Article[]
}

export async function getPublisherCollection(): Promise<
  Collection<PublisherDocument>
> {
  const db = await getDb()

  return db.collection<PublisherDocument>(PUBLISHERS_COLLECTION)
}

export async function listPublishers(): Promise<Publisher[]> {
  const collection = await getPublisherCollection()
  const documents = await collection.find().sort({ order: 1, _id: 1 }).toArray()

  return documents.map(toPublisher)
}

export async function seedPublishers(publishers: readonly Publisher[]) {
  const collection = await getPublisherCollection()

  await Promise.all(
    publishers.map((publisher, order) => {
      const { id, ...publisherFields } = publisher

      return collection.updateOne(
        { _id: id },
        {
          $set: {
            order,
            ...publisherFields,
            articles: publisher.articles.map((article) => ({ ...article })),
          },
        },
        { upsert: true },
      )
    }),
  )
}

function toPublisher(document: PublisherDocument): Publisher {
  return {
    articles: document.articles,
    category: document.category,
    editedAt: document.editedAt,
    id: document._id,
    name: document.name,
    wordmark: document.wordmark,
  }
}
