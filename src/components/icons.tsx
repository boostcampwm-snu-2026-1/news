interface IconProps {
  active?: boolean;
}

export function GridIcon({ active = false }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      {[4, 12].map((x) =>
        [4, 12].map((y) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="8"
            height="8"
            rx="1.5"
            opacity={active ? 1 : 0.72}
          />
        ))
      )}
    </svg>
  );
}

export function ListIcon({ active = false }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      {[6, 12, 18].map((y) => (
        <path
          key={y}
          d={`M5 ${y}h14`}
          opacity={active ? 1 : 0.72}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className="icon icon--chevron"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d={
          direction === "left"
            ? "M14 5 8 12l6 7"
            : "m10 5 6 7-6 7"
        }
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
