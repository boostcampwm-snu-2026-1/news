import { Router } from 'express'
import {
  getSubscribedPublisherIds,
  updatePublisherSubscription,
} from '../models/subscription.js'

export const subscriptionsRouter = Router()

subscriptionsRouter.get('/', async (request, response, next) => {
  try {
    const clientId = getClientId(request)

    if (!clientId) {
      response.status(400).json({ message: 'x-client-id header is required' })
      return
    }

    const publisherIds = await getSubscribedPublisherIds(clientId)

    response.json({ publisherIds })
  } catch (error) {
    next(error)
  }
})

subscriptionsRouter.put('/:publisherId', async (request, response, next) => {
  try {
    const clientId = getClientId(request)
    const publisherId = request.params.publisherId
    const subscribed = request.body?.subscribed

    if (!clientId) {
      response.status(400).json({ message: 'x-client-id header is required' })
      return
    }

    if (typeof publisherId !== 'string' || publisherId.length === 0) {
      response.status(400).json({ message: 'publisherId is required' })
      return
    }

    if (typeof subscribed !== 'boolean') {
      response.status(400).json({ message: 'subscribed boolean is required' })
      return
    }

    const publisherIds = await updatePublisherSubscription({
      clientId,
      publisherId,
      subscribed,
    })

    response.json({ publisherIds })
  } catch (error) {
    next(error)
  }
})

function getClientId(request: { get(headerName: string): string | undefined }) {
  return request.get('x-client-id')?.trim()
}
