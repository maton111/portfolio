import teamsystemSvg from '../assets/teamsystem_enterprise_backend_hero.svg'
import legacySvg from '../assets/legacy_refactoring_hero.svg'

export type ProjectCard = {
  id: string
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

export type LogEntry = {
  date: string
  title: string
  note: string
  tone?: 'green' | 'secondary' | 'orange' | 'muted'
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
]

export const systemLogs: LogEntry[] = [
  {
    date: '2026 // TeamSystem',
    title: 'Enterprise backend maintenance',
    note: 'API e logiche business su sistemi ad alto carico.',
    tone: 'green',
  },
  {
    date: '2025 // TeamSystem',
    title: 'Testing rollout',
    note: 'Introduzione di unit e integration test su progetti esistenti.',
    tone: 'secondary',
  },
  {
    date: '2024 // TeamSystem',
    title: 'Legacy modernization',
    note: 'Refactoring verso Clean Architecture e standardizzazione backend.',
    tone: 'orange',
  },
  {
    date: '2021-2023 // SINCON',
    title: 'Multi-stack software projects',
    note: 'Backend con C#, Python e PHP su portali e sistemi dati.',
    tone: 'muted',
  },
]

export const repoStatus = {
  efficiency: 'Backend first / Full stack direction',
  filledBars: 44,
  totalBars: 50,
}

