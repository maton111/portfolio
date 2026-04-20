export const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'timeline', 'blog', 'contact'] as const

export type SectionId = (typeof SECTION_IDS)[number]

export const SECTION_SCROLL_OFFSETS: Record<SectionId, number> = {
  home: 0,
  about: 0,
  skills: 0,
  projects: 0,
  timeline: 0,
  blog: 0,
  contact: 0,
}

export const SECTION_SCROLL_BEHAVIOR = 'smooth' as const
