import {
  SECTION_SCROLL_BEHAVIOR,
  SECTION_SCROLL_OFFSETS,
  type SectionId,
} from '../data/sectionNavigation'

function clampScrollTop(nextTop: number) {
  if (typeof document === 'undefined') {
    return nextTop
  }

  const documentElement = document.documentElement
  const body = document.body
  const maxScrollTop = Math.max(
    0,
    Math.max(documentElement.scrollHeight, body.scrollHeight) - window.innerHeight,
  )

  return Math.min(Math.max(0, nextTop), maxScrollTop)
}

export function scrollToSection(sectionId: SectionId) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (sectionId === 'home') {
    window.scrollTo({top: 0, behavior: SECTION_SCROLL_BEHAVIOR})
    return
  }

  const targetElement = document.getElementById(sectionId)

  if (!targetElement) {
    return
  }

  const targetOffset = SECTION_SCROLL_OFFSETS[sectionId]
  const top = targetElement.getBoundingClientRect().top + window.scrollY - targetOffset

  window.scrollTo({top: clampScrollTop(top), behavior: SECTION_SCROLL_BEHAVIOR})
}


