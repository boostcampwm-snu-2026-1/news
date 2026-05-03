import { ButtonGroup, ButtonGroupItem } from '../ui/ButtonGroup'

type ViewMode = 'LIST' | 'GRID'

type ViewModeButtonGroupProps = {
  viewMode: ViewMode
  onViewModeChange: (value: ViewMode) => void
}

function ListViewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 7H18M6 12H18M6 17H18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function GridViewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 6.5H10.5V10.5H6.5V6.5ZM13.5 6.5H17.5V10.5H13.5V6.5ZM6.5 13.5H10.5V17.5H6.5V13.5ZM13.5 13.5H17.5V17.5H13.5V13.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

export function ViewModeButtonGroup({
  viewMode,
  onViewModeChange,
}: ViewModeButtonGroupProps) {
  return (
    <ButtonGroup aria-label="View mode">
      <ButtonGroupItem
        active={viewMode === 'LIST'}
        aria-label="List view"
        onClick={() => onViewModeChange('LIST')}
      >
        <ListViewIcon />
      </ButtonGroupItem>
      <ButtonGroupItem
        active={viewMode === 'GRID'}
        aria-label="Grid view"
        onClick={() => onViewModeChange('GRID')}
      >
        <GridViewIcon />
      </ButtonGroupItem>
    </ButtonGroup>
  )
}
