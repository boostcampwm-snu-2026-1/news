import { useEffect, useState } from 'react'
import { fetchNewsstandData, fetchSubscriptions } from '../api/newsStand'
import type { NewsstandData, SubscriptionPayload } from '../types/newsStand'

type NewsstandDataState =
  | { status: 'loading' }
  | {
      status: 'ready'
      data: NewsstandData
      subscriptions: SubscriptionPayload
    }
  | { status: 'error'; message: string }

export function useNewsstandData() {
  const [state, setState] = useState<NewsstandDataState>({ status: 'loading' })

  useEffect(() => {
    const abortController = new AbortController()

    async function loadNewsstandData() {
      try {
        const [data, subscriptions] = await Promise.all([
          fetchNewsstandData(abortController.signal),
          fetchSubscriptions(abortController.signal),
        ])

        setState({ data, status: 'ready', subscriptions })
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setState({
          message:
            error instanceof Error
              ? error.message
              : '뉴스스탠드 데이터를 불러오지 못했습니다.',
          status: 'error',
        })
      }
    }

    void loadNewsstandData()

    return () => {
      abortController.abort()
    }
  }, [])

  return state
}
