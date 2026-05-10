import { closeMongoClient } from '../db/mongo.js'
import { SEEDED_PUBLISHERS } from '../data/newsStandSeed.js'
import { seedPublishers } from '../models/publisher.js'

try {
  await seedPublishers(SEEDED_PUBLISHERS)
  console.log(`Seeded ${SEEDED_PUBLISHERS.length} publishers`)
} finally {
  await closeMongoClient()
}
