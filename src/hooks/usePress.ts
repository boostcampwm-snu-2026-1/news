import { useState } from 'react'
import type { PressId, CategoryKey } from '../types'

export function usePress() {
  const [opened, setOpened] = useState<PressId | null>(null)
  const [tabKey, setTabKey] = useState<CategoryKey>('')

  const handleOpen = (_id: PressId): void => {}
  const handleClose = (): void => {}
  const handleTabKey = (_key: CategoryKey): void => {}

  return { opened, tabKey, handleOpen, handleClose, handleTabKey }
}
