import teamsystemSvg from '../assets/teamsystem_enterprise_backend_hero.svg'
import legacySvg from '../assets/legacy_refactoring_hero.svg'
import opcmHeroBannerSvg from '../assets/opcm_hero_banner.svg'

export type ProjectCard = {
  id: string
  slug: string
  title: string
  difficulty: 'Enterprise' | 'Product' | 'Modernization'
  description: string
  tags: string[]
  icon: string
  tone?: 'green' | 'orange'
  visual: 'circuit' | 'vault' | 'kernel'
  backgroundImage?: string | { default: string }
  featured?: boolean
}

export const projectsHeader = {
  eyebrow: 'CV Snapshot // Projects',
  titleTop: 'PROJECT',
  titleBottom: 'EXPERIENCE',
  intro:
    'Una selezione di esperienze e progetti che raccontano il mio lavoro su backend enterprise .NET, modernizzazione legacy e sviluppo full stack.',
}

export const projectCards: ProjectCard[] = [
  {
    id: 'TS-API-01',
    slug: 'teamsystem-enterprise-backend',
    title: 'TeamSystem Enterprise Backend',
    difficulty: 'Enterprise',
    description:
      'Sviluppo e manutenzione di backend .NET in ambito enterprise con centinaia di API, logiche business critical e attenzione a stabilita e manutenibilita.',
    tags: ['.NET', 'C#', 'REST API', 'SQL Server'],
    icon: 'hub',
    backgroundImage: teamsystemSvg,
    visual: 'circuit',
  },
  {
    id: 'SC-LEG-02',
    slug: 'legacy-refactoring-program',
    title: 'Legacy Refactoring Program',
    difficulty: 'Modernization',
    description:
      'Refactoring progressivo di sistemi storici verso Clean Architecture con introduzione di standard condivisi, unit test e integration test.',
    tags: ['Clean Architecture', 'xUnit/NUnit', 'Integration Test'],
    icon: 'sync_alt',
    backgroundImage: legacySvg,
    visual: 'vault',
  },
  {
    id: 'ELC-CORE-03',
    slug: 'everyday-life-core',
    title: 'Everyday Life Core (in sviluppo)',
    difficulty: 'Product',
    description:
      'Progetto personale full stack: backend .NET, frontend React, mobile Flutter e funzionalita realtime per task, gruppi, notifiche e gestione quotidiana.',
    tags: ['.NET', 'React', 'Flutter', 'PostgreSQL', 'WebSocket'],
    icon: 'rocket_launch',
    tone: 'orange',
    visual: 'kernel',
    featured: true,
  },
  {
    id: 'OPCM-APP-04',
    slug: 'opcm',
    title: 'One Piece Card Market (OPCM)',
    difficulty: 'Product',
    description:
      'Applicazione desktop client-server per la gestione della collezione One Piece TCG, con backend ASP.NET Core 8, persistenza PostgreSQL e workflow CardMarket-ready.',
    tags: ['ASP.NET Core 8', 'Windows Forms', 'PostgreSQL', 'EF Core', 'REST API'],
    icon: 'collections_bookmark',
    backgroundImage: opcmHeroBannerSvg,
    visual: 'circuit',
  },
]
