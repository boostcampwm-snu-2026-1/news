import { MongoClient } from 'mongodb'
import { config, requireMongoUri } from '../config.js'

let client: MongoClient | null = null

export async function getMongoClient() {
  if (client) {
    return client
  }

  client = new MongoClient(requireMongoUri())
  await client.connect()

  return client
}

export async function getDb() {
  const mongoClient = await getMongoClient()

  return mongoClient.db(config.mongoDbName)
}

export async function closeMongoClient() {
  if (!client) {
    return
  }

  await client.close()
  client = null
}
