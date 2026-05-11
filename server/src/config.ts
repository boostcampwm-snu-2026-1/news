import 'dotenv/config'

const DEFAULT_PORT = 3000
const DEFAULT_DB_NAME = 'news-stand'
const DEFAULT_CLIENT_ORIGIN = 'http://localhost:5173'

export const config = {
  clientOrigin: process.env.CLIENT_ORIGIN ?? DEFAULT_CLIENT_ORIGIN,
  mongoDbName: process.env.MONGODB_DB_NAME ?? DEFAULT_DB_NAME,
  mongoUri: process.env.MONGODB_URI,
  port: Number(process.env.PORT ?? DEFAULT_PORT),
}

export function requireMongoUri() {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is required')
  }

  return config.mongoUri
}
