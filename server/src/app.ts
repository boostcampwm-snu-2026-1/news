import cors from 'cors'
import express from 'express'
import { config } from './config.js'
import { healthRouter } from './routes/health.js'
import { newsstandRouter } from './routes/newsstand.js'
import { subscriptionsRouter } from './routes/subscriptions.js'

export function createApp() {
  const app = express()
  const allowedOrigins = config.clientOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true)
          return
        }

        callback(new Error(`Origin ${origin} is not allowed by CORS`))
      },
    }),
  )
  app.use(express.json())

  app.use('/api/health', healthRouter)
  app.use('/api/newsstand', newsstandRouter)
  app.use('/api/subscriptions', subscriptionsRouter)

  app.use((_request, response) => {
    response.status(404).json({ message: 'Not found' })
  })

  app.use(
    (
      error: Error,
      _request: express.Request,
      response: express.Response,
      next: express.NextFunction,
    ) => {
      void next
      console.error(error)
      response.status(500).json({ message: 'Internal server error' })
    },
  )

  return app
}
