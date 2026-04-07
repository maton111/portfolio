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

export type LogEntry = {
  date: string
  title: string
  note: string
  tone?: 'green' | 'secondary' | 'orange' | 'muted'
}

export type ProjectNotesSection = {
  title: string
  points: string[]
}

export type ProjectNotes = {
  slug: string
  headline: string
  role: string
  context: string
  challenge: string
  timeline: string[]
  stack: string[]
  sections: ProjectNotesSection[]
  outcomes: string[]
  nextSteps: string[]
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

export const projectNotes: ProjectNotes[] = [
  {
    slug: 'teamsystem-enterprise-backend',
    headline: 'Backend enterprise .NET ad alto carico con attenzione a stabilita, qualita e manutenibilita.',
    role: 'Backend Developer',
    context:
      'Contesto enterprise con API mission-critical, integrazioni cross-team e backlog evolutivo su codice gia in produzione.',
    challenge:
      'Mantenere velocita di delivery senza perdere controllo su regressioni, consistenza del dominio e debt tecnico.',
    timeline: ['2024-Q3 onboarding stack', '2025-Q1 rollout test coverage', '2026 consolidamento flussi API ad alto traffico'],
    stack: ['.NET 8', 'C#', 'REST API', 'SQL Server', 'xUnit/NUnit', 'CI pipeline'],
    sections: [
      {
        title: 'Cosa ho fatto',
        points: [
          'Manutenzione e sviluppo endpoint su domini business diversi, con attenzione a backward compatibility.',
          'Refactoring mirato di componenti ad alta complessita per ridurre coupling e migliorare leggibilita.',
          'Definizione di linee guida condivise su naming, gestione errori e validazioni applicative.',
        ],
      },
      {
        title: 'Decisioni ingegneristiche',
        points: [
          'Standardizzazione dei contratti API e della gestione dei codici errore per ridurre ambiguita lato consumer.',
          'Introduzione incrementale di test su aree ad alto rischio invece di big-bang testing.',
          'Separazione piu netta tra business logic e layer infrastrutturale nelle aree toccate dal refactoring.',
        ],
      },
      {
        title: 'Collaborazione e delivery',
        points: [
          'Allineamento con team di prodotto e QA su criteri di accettazione e casi edge.',
          'Supporto a debugging di issue in produzione con approccio data-driven su log e tracing applicativo.',
          'Contributo a review tecniche per mantenere coerenza architetturale nel tempo.',
        ],
      },
    ],
    outcomes: [
      'Riduzione stimata del tempo medio di analisi bug su moduli refactorizzati (~20-30%).',
      'Migliore prevedibilita dei rilasci grazie a copertura test incrementale su flussi critici.',
      'Codice piu semplice da estendere in presenza di nuove regole business.',
    ],
    nextSteps: [
      'Aumentare copertura integration test sui flussi multi-servizio.',
      'Evolvere osservabilita con dashboard operative piu granulari.',
    ],
  },
  {
    slug: 'legacy-refactoring-program',
    headline: 'Modernizzazione di sistemi legacy verso Clean Architecture senza bloccare il business.',
    role: 'Backend Developer - Refactoring Track',
    context:
      'Codebase storica con accoppiamento elevato, classi monolitiche e test automation limitata.',
    challenge:
      'Ridurre technical debt mantenendo continuita operativa e compatibilita con processi esistenti.',
    timeline: ['Assessment e mappa debito tecnico', 'Migrazione per layer e bounded area', 'Hardening con test e quality gate'],
    stack: ['C#', '.NET', 'Clean Architecture', 'xUnit', 'NUnit', 'SQL Server', 'CI quality checks'],
    sections: [
      {
        title: 'Approccio di migrazione',
        points: [
          'Scomposizione progressiva delle god class in componenti piu piccoli e testabili.',
          'Introduzione di confini chiari tra Domain, Application, Infrastructure e Presentation.',
          'Migrazione a tranche con fallback plan per minimizzare rischio sui rilasci.',
        ],
      },
      {
        title: 'Qualita e affidabilita',
        points: [
          'Adozione di unit e integration test nelle aree con piu regressioni storiche.',
          'Definizione di checklist di review dedicate al refactoring (dipendenze, naming, side effects).',
          'Inserimento di quality gate in pipeline per evitare regressioni strutturali.',
        ],
      },
      {
        title: 'Impatto sul team',
        points: [
          'Documentazione delle nuove convenzioni per rendere il refactoring replicabile.',
          'Supporto al team nel passaggio da approccio monolitico a responsabilita meglio distribuite.',
          'Riduzione attrito tra manutenzione correttiva e sviluppo evolutivo.',
        ],
      },
    ],
    outcomes: [
      'Riduzione credibile della complessita ciclomatica nelle aree migrate.',
      'Migliore confidenza nei rilasci grazie a suite test piu stabile.',
      'Base architetturale piu sana per evoluzioni future.',
    ],
    nextSteps: [
      'Estendere pattern di migrazione anche ai moduli a minor priorita.',
      'Aumentare automazione quality checks statiche e architetturali.',
    ],
  },
  {
    slug: 'opcm',
    headline: 'Prodotto desktop client-server per collezionisti TCG con backend ASP.NET Core e workflow reali.',
    role: 'Full Stack Developer (Backend-first)',
    context:
      'Progetto personale strutturato come prodotto reale: backend REST, client desktop, persistenza cloud PostgreSQL.',
    challenge:
      'Bilanciare UX desktop, robustezza lato API e modellazione dati utile a filtri avanzati e casi d uso concreti.',
    timeline: ['MVP collection manager', 'Ricerca avanzata e soft-delete', 'Integrazione workflow CardMarket-ready'],
    stack: ['ASP.NET Core 8', 'Windows Forms', 'PostgreSQL', 'EF Core', 'AutoMapper', 'Swagger', 'N-Tier Architecture'],
    sections: [
      {
        title: 'Backend e dominio',
        points: [
          'Progettazione API per gestione carte, espansioni, filtri multipli e operazioni di update sicure.',
          'Implementazione Service Layer con regole business (duplicati logici, ripristino, soft-delete).',
          'Uso di DTO + AutoMapper per separare contratto API da modello dati interno.',
        ],
      },
      {
        title: 'Data flow e affidabilita',
        points: [
          'Repository pattern generico per mantenere accesso dati consistente e riutilizzabile.',
          'Validazioni applicative su combinazioni critiche (espansione, numero, rarita, condizione).',
          'Supporto a workflow operativi reali: toggle rapido stato CardMarket, ordinamenti multipli, ricerca libera.',
        ],
      },
      {
        title: 'Esperienza utente desktop',
        points: [
          'Interfaccia dark/green con DataGrid operativa, azioni inline e feedback contestuali.',
          'Separazione Gateway HTTP lato frontend per mantenere le form pulite e manutenibili.',
          'Packaging installer per uso diretto in ambiente Windows.',
        ],
      },
    ],
    outcomes: [
      'Applicazione utilizzabile end-to-end su casi reali di gestione collezione.',
      'Architettura chiara che facilita evoluzioni (dashboard, deck management, integrazione prezzi).',
      'Portfolio project che dimostra ownership completa dal dominio al rilascio.',
    ],
    nextSteps: [
      'Integrazione diretta API CardMarket per aggiornamento prezzo automatico.',
      'Evoluzione frontend verso stack moderno cross-platform.',
    ],
  },
]

export function getProjectNotesBySlug(slug?: string) {
  if (!slug) {
    return null
  }

  return projectNotes.find((item) => item.slug === slug) ?? null
}

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

