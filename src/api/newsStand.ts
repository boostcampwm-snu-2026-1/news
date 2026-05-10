import type {
  NewsstandData,
  Publisher,
  SubscriptionPayload,
} from '../types/newsStand'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'
).replace(/\/$/, '')
const CLIENT_ID_STORAGE_KEY = 'newsstandClientId'

let memoryClientId: string | null = null

export function getNewsstandClientId() {
  if (memoryClientId) {
    return memoryClientId
  }

  try {
    const storedClientId = window.localStorage.getItem(CLIENT_ID_STORAGE_KEY)

    if (storedClientId) {
      memoryClientId = storedClientId
      return storedClientId
    }

    const clientId = createClientId()
    window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId)
    memoryClientId = clientId

    return clientId
  } catch {
    memoryClientId = createClientId()

    return memoryClientId
  }
}

export async function fetchNewsstandData(signal?: AbortSignal) {
  return request<NewsstandData>('/api/newsstand', { signal })
}

export async function fetchSubscriptions(signal?: AbortSignal) {
  return request<SubscriptionPayload>('/api/subscriptions', {
    headers: getClientHeaders(),
    signal,
  })
}

export async function updatePublisherSubscription(
  publisherId: Publisher['id'],
  subscribed: boolean,
) {
  return request<SubscriptionPayload>(`/api/subscriptions/${publisherId}`, {
    body: JSON.stringify({ subscribed }),
    headers: {
      ...getClientHeaders(),
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  })
}

async function request<TResponse>(
  path: string,
  init: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}

function getClientHeaders() {
  return {
    'x-client-id': getNewsstandClientId(),
  }
}

function createClientId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `client-${Date.now()}-${Math.random().toString(36).slice(2)}`
}
