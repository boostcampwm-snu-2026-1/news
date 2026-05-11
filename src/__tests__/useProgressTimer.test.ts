import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProgressTimer } from '../hooks/useProgressTimer'

describe('useProgressTimer', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.restoreAllMocks() })

  it('progress increases over time', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useProgressTimer(true, 6000, onComplete))
    expect(result.current.progress).toBe(0)
    act(() => { vi.advanceTimersByTime(3000) })
    expect(result.current.progress).toBeGreaterThan(0)
    expect(result.current.progress).toBeLessThan(100)
  })

  it('calls onComplete after durationMs', () => {
    const onComplete = vi.fn()
    renderHook(() => useProgressTimer(true, 1000, onComplete))
    act(() => { vi.advanceTimersByTime(1100) })
    expect(onComplete).toHaveBeenCalled()
  })

  it('resets progress to 0 when reset() called', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useProgressTimer(true, 6000, onComplete))
    act(() => { vi.advanceTimersByTime(2000) })
    expect(result.current.progress).toBeGreaterThan(0)
    act(() => { result.current.reset() })
    expect(result.current.progress).toBe(0)
  })

  it('stops timer when enabled=false', () => {
    const onComplete = vi.fn()
    const { result, rerender } = renderHook(
      ({ enabled }) => useProgressTimer(enabled, 6000, onComplete),
      { initialProps: { enabled: true } }
    )
    act(() => { vi.advanceTimersByTime(1000) })
    const progressBefore = result.current.progress
    rerender({ enabled: false })
    act(() => { vi.advanceTimersByTime(3000) })
    expect(result.current.progress).toBe(progressBefore)
    expect(onComplete).not.toHaveBeenCalled()
  })
})
