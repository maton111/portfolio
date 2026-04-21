export type BlogTone = 'green' | 'mint' | 'orange'

export type BlogPost = {
  id: string
  slug: string
  date: string
  readEN: string
  readIT: string
  tagEN: string
  tagIT: string
  tone: BlogTone
  icon: string
  featured?: boolean
  titleEN: string
  titleIT: string
  excerptEN: string
  excerptIT: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'LOG_001',
    slug: 'modernizing-legacy-code',
    date: '2026.03.14',
    readEN: '8 min', readIT: '8 min',
    tagEN: 'ARCHITECTURE', tagIT: 'ARCHITETTURA',
    tone: 'green',
    icon: 'architecture',
    featured: true,
    titleEN: 'Modernizing legacy code without breaking nothing',
    titleIT: 'Modernizzare codice legacy senza rompere niente',
    excerptEN: 'A practical framework for knowing where to cut and where to keep. Every 2000-line class has a story — throwing it away without listening costs double.',
    excerptIT: 'Un framework pratico per capire dove tagliare e dove tenere. Perché ogni classe di 2000 righe ha una storia, e buttarla via senza ascoltarla costa il doppio.',
  },
  {
    id: 'LOG_002',
    slug: 'elc-week-14',
    date: '2026.02.28',
    readEN: '5 min', readIT: '5 min',
    tagEN: 'DEVLOG', tagIT: 'DEVLOG',
    tone: 'mint',
    icon: 'terminal',
    titleEN: 'Everyday Life Core — week 14',
    titleIT: 'Everyday Life Core — settimana 14',
    excerptEN: "Live dashboard and presence management over WebSocket and reconnection logic that doesn't explode when the network throws a tantrum.",
    excerptIT: "Dashboard live e gestione presence tramite WebSocket e reconnection logic che non esplode quando la rete fa i capricci.",
  },
  {
    id: 'LOG_003',
    slug: 'integration-tests',
    date: '2026.02.11',
    readEN: '4 min', readIT: '4 min',
    tagEN: 'TESTING', tagIT: 'TESTING',
    tone: 'orange',
    icon: 'science',
    titleEN: 'Integration tests that actually let you sleep',
    titleIT: 'Test di integrazione che fanno davvero dormire bene',
    excerptEN: "When a test passes, it should mean it works — not just that it didn't crash. Subtle differences, concrete consequences.",
    excerptIT: "Quando un test passa, deve voler dire che funziona — non solo che non crasha. Differenze sottili, rotture concrete.",
  },
  {
    id: 'LOG_04',
    slug: 'from-backend-to-fullstack',
    date: '2026.01.23',
    readEN: '6 min', readIT: '6 min',
    tagEN: 'FULL STACK', tagIT: 'FULL STACK',
    tone: 'green',
    icon: 'integration_instructions',
    titleEN: 'From pure backend to full stack in 18 months',
    titleIT: 'Da backend puro a full stack in 18 mesi',
    excerptEN: 'What I learned going from APIs only to React + Flutter. The easy parts, the parts that hurt, the parts that actually rewire how you think.',
    excerptIT: 'Cosa ho imparato passando da solo API a React + Flutter. Le parti facili, le parti che fanno male, le parti che cambiano davvero il modo di pensare.',
  },
]

export const TONE_VAR: Record<BlogTone, string> = {
  green:  'var(--accent-green)',
  orange: 'var(--accent-orange)',
  mint:   'var(--accent-mint)',
}

export function getBlogPostBySlug(slug?: string): BlogPost | null {
  if (!slug) return null
  return blogPosts.find((p) => p.slug === slug) ?? null
}
