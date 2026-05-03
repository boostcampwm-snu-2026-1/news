import { useState } from 'react'

import type { User } from '../type/types'

const DEFAULT_USER: User = {
  id: 'user-1',
  name: '뉴스스탠드 사용자',
  subscribingMediaList: [],
}

export function useSubscription(initialUser: User = DEFAULT_USER) {
  const [user, setUser] = useState<User>(initialUser)

  function isSubscribed(mediaId: string) {
    return user.subscribingMediaList.includes(mediaId)
  }

  function subscribe(mediaId: string) {
    setUser((currentUser) => {
      if (currentUser.subscribingMediaList.includes(mediaId)) {
        return currentUser
      }

      return {
        ...currentUser,
        subscribingMediaList: [...currentUser.subscribingMediaList, mediaId],
      }
    })
  }

  function unsubscribe(mediaId: string) {
    setUser((currentUser) => ({
      ...currentUser,
      subscribingMediaList: currentUser.subscribingMediaList.filter(
        (id) => id !== mediaId,
      ),
    }))
  }

  function toggleSubscription(mediaId: string) {
    if (isSubscribed(mediaId)) {
      unsubscribe(mediaId)
      return
    }

    subscribe(mediaId)
  }

  return {
    user,
    isSubscribed,
    subscribe,
    unsubscribe,
    toggleSubscription,
  }
}
