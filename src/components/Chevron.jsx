export default function Chevron({ direction, disabled, onClick }) {
  const isLeft = direction === 'left'

  return (
    <button
      className="chevron"
      type="button"
      aria-label={isLeft ? '이전 페이지' : '다음 페이지'}
      disabled={disabled}
      onClick={onClick}
    >
      {isLeft ? '<' : '>'}
    </button>
  )
}
