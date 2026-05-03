import { useState } from 'react'

export function usePagination(totalPages: number) {
  const [page, setPage] = useState(0)

  const handlePrev = (): void => {}
  const handleNext = (): void => {}

  return { page, handlePrev, handleNext, totalPages }
}
