import { Router } from 'express'
import { CATEGORIES, createTickerItems } from '../data/newsStandSeed.js'
import { listPublishers } from '../models/publisher.js'
import type { NewsstandPayload } from '../types/newsStand.js'

export const newsstandRouter = Router()

newsstandRouter.get('/', async (_request, response, next) => {
  try {
    const publishers = await listPublishers()
    const payload: NewsstandPayload = {
      categories: CATEGORIES,
      publishers,
      tickerItems: createTickerItems(publishers),
    }

    response.json(payload)
  } catch (error) {
    next(error)
  }
})
