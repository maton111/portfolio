export const OPEN_PALETTE_EVENT = 'portfolio:open-palette'

/** Opens the command palette from anywhere (header button, footer hint, 404 page). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))
}
