export type SkillMetric = {
  label: string
  value: number
  tone?: 'green' | 'orange'
}

export type SkillModule = {
  title: string
  moduleId: string
  status: string
  statusTone?: 'green' | 'orange'
  borderTone?: 'green' | 'orange'
  columns: number
  metrics: SkillMetric[]
  tags: string[]
  icon?: string
}

export const skillsHeader = {
  eyebrow: 'CV Snapshot // Skills Matrix',
  titleStart: 'ENGINEERING',
  titleAccent: 'SKILLS',
  titleEnd: 'OVERVIEW',
}

export const skillsModules: SkillModule[] = [
  {
    title: 'ENTERPRISE BACKEND (.NET)',
    moduleId: 'BE-2026',
    status: 'PRODUCTION_READY',
    columns: 7,
    metrics: [
      { label: 'ASP.NET Core / Web API', value: 96 },
      { label: 'Business Logic & Refactoring', value: 94 },
      { label: 'Legacy Modernization', value: 92 },
    ],
    tags: ['C#', '.NET', 'Enterprise Systems'],
  },
  {
    title: 'ARCHITECTURE & APIS',
    moduleId: 'AR-1102',
    status: 'SCALABLE_DESIGN',
    columns: 5,
    metrics: [
      { label: 'Clean Architecture', value: 94 },
      { label: 'REST API Design', value: 87 },
      { label: 'Microservices Mindset', value: 84 },
    ],
    tags: ['Controller/Service/Repository', 'Scalability', 'Maintainability'],
  },
  {
    title: 'TESTING & CODE QUALITY',
    moduleId: 'QA-4401',
    status: 'ACTIVE_PRACTICE',
    columns: 5,
    metrics: [
      { label: 'Unit Test (xUnit/NUnit)', value: 90 },
      { label: 'Integration Test', value: 88 },
      { label: 'E2E Coverage', value: 52 },
    ],
    tags: ['Testing First Mindset', 'Reliability', 'Code Standards'],
  },
  {
    title: 'DATA LAYER & SEARCH',
    moduleId: 'DB-7300',
    status: 'MULTI_DB_READY',
    columns: 7,
    metrics: [
      { label: 'SQL Server / PostgreSQL', value: 92 },
      { label: 'MySQL / MariaDB / Oracle', value: 84 },
      { label: 'Elasticsearch', value: 79, tone: 'orange' },
    ],
    tags: ['Relational Databases', 'Query Optimization', 'Data Consistency'],
  },
  {
    title: 'DEVOPS & DELIVERY',
    moduleId: 'DX-9901',
    status: 'CONTINUOUS_IMPROVEMENT',
    columns: 7,
    metrics: [
      { label: 'Docker & Containerization', value: 86 },
      { label: 'CI/CD Pipelines', value: 88 },
      { label: 'Monitoring (Grafana)', value: 82 },
    ],
    tags: ['GitHub Actions', 'Linux/VPS', 'Release Workflow'],
  },
  {
    title: 'AI-ASSISTED FULL STACK',
    moduleId: 'FS-2088',
    status: 'LEVELING_UP',
    statusTone: 'orange',
    borderTone: 'orange',
    columns: 5,
    icon: 'rocket_launch',
    metrics: [
      { label: 'React + Flutter Product Build', value: 84, tone: 'orange' },
      { label: 'AI-Assisted Development', value: 90, tone: 'orange' },
      { label: 'Realtime Features', value: 81, tone: 'orange' },
    ],
    tags: ['Product Mindset'],
  },
]

export const skillsBottomPanel = {
  title: 'Career_Link: ACTIVE',
  description:
    'Backend engineer focused on scalable systems, software quality and continuous growth across enterprise and personal products.',
  lastUpdate: '2026.04.02.10:20',
  uptime: 'Always Learning',
}

