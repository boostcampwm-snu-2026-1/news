export default function Chevron({ direction, disabled, currentPage, totalPages, onClick }) {
  const isLeft = direction === 'left'
  const label = isLeft
    ? `이전 페이지, 현재 ${currentPage}/${totalPages}`
    : `다음 페이지, 현재 ${currentPage}/${totalPages}`

  return (
    <button
      className={`chevron chevron--${isLeft ? 'left' : 'right'}`}
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="chevron__icon" aria-hidden="true" />
    </button>
  )
}
