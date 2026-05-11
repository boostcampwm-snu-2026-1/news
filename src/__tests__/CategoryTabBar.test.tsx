import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryTabBar from '../components/ListView/CategoryTabBar'

describe('CategoryTabBar', () => {
  it('renders all 6 categories', () => {
    render(<CategoryTabBar activeCategory="종합/경제" onCategoryChange={vi.fn()} progress={0} currentIndex={1} total={3} />)
    expect(screen.getByText('IT')).toBeInTheDocument()
    expect(screen.getByText('지역')).toBeInTheDocument()
  })

  it('calls onCategoryChange when tab clicked', async () => {
    const onCategoryChange = vi.fn()
    render(<CategoryTabBar activeCategory="종합/경제" onCategoryChange={onCategoryChange} progress={0} currentIndex={1} total={3} />)
    await userEvent.click(screen.getByText('IT'))
    expect(onCategoryChange).toHaveBeenCalledWith('IT')
  })

  it('progress bar has correct width style', () => {
    const { container } = render(
      <CategoryTabBar activeCategory="종합/경제" onCategoryChange={vi.fn()} progress={50} currentIndex={1} total={3} />
    )
    const progressBar = container.querySelector('[style*="width: 50%"]')
    expect(progressBar).not.toBeNull()
  })
})
