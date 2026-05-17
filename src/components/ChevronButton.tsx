import { ChevronIcon } from "./icons";

interface ChevronButtonProps {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}

export function ChevronButton({
  direction,
  disabled,
  onClick
}: ChevronButtonProps) {
  return (
    <button
      type="button"
      className={`chevron chevron--${direction}`}
      aria-label={direction === "left" ? "이전 페이지" : "다음 페이지"}
      disabled={disabled}
      onClick={onClick}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}
