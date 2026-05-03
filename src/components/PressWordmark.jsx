export default function PressWordmark({ press }) {
  return (
    <span className="press-wordmark" style={{ color: press.color, fontWeight: press.weight }}>
      {press.name}
    </span>
  )
}
