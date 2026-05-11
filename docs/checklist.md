# Implementation Checklist

## Week 1
- [x] Set up the newsstand page shell with the 1280 x 720 canvas and centered 930px content column.
- [x] Define the core design tokens for color, spacing, typography, and line styles from `docs/spec.md`.
- [x] Build the header with the newspaper icon, brand wordmark, and current date aligned to the right.
- [x] Implement the auto-rolling ticker area with the correct height, background, and two-lane structure.
- [x] Add the main press grid layout for `전체 언론사` with 6 columns, 4 rows, and 1px separators.
- [x] Create the styled press wordmark component with support for family, weight, italic, tracking, and size variants.
- [x] Add the pagination chevrons outside the content column and keep them visually outlined.
- [x] Implement the field tab bar shell for the opened-press view with tab roles and baseline states.
- [x] Build the opened-press list layout with the left detail column and the right list column.
- [x] Wire the primary typography, spacing, and border treatments so the page matches the dense, calm visual style.

## Week 2
- [x] Add hover behavior on grid cells to reveal the subscribe/unsubscribe pill.
- [x] Implement the subscribed-state grid for `내가 구독한 언론사`, including sparse cells and empty white slots.
- [x] Add tab progress overlays for the opened-press view with the 6-second linear fill animation.
- [x] Implement automatic tab/category advancement when the progress bar completes.
- [x] Add ticker rotation timing, crossfade behavior, and pause-on-hover/focus logic.
- [x] Connect page-level navigation and state changes between grid view and list view.
- [x] Make the header date dynamic so it reflects the current day.
- [x] Ensure press wordmarks support long names, two-line wrapping, and special flags or accent variants.
- [x] Add reduced-motion handling so animations are disabled or simplified when requested by the OS.
- [x] Verify accessible roles and labels for tabs, tablist, buttons, and interactive grid controls.
