export type SkillMetric = {
  label: string
  value: number
  tone?: 'green' | 'orange'
}

export type SkillTag = {
  label: string
  value: number
}

export type SkillModule = {
  titleKey: string
  moduleId: string
  statusKey: string
  statusTone?: 'green' | 'orange'
  borderTone?: 'green' | 'orange'
  columns: number
  metrics: SkillMetric[]
  tags: SkillTag[]
  icon?: string
}

// skillsHeader strings moved to i18n (skills.eyebrow / titleStart / titleAccent / titleEnd)

export const skillsModules: SkillModule[] = [
  {
    titleKey: 'skills.be2026Title',
    moduleId: 'BE-2026',
    statusKey: 'skills.be2026Status',
    columns: 7,
    metrics: [
      { label: 'ASP.NET Core / Web API', value: 96 },
      { label: 'C#', value: 95 },
      { label: 'Java', value: 39 },
      { label: 'Node.js (Express, NestJS)', value: 66 },
      { label: 'Python (Django, FastAPI)', value: 72 },
    ],
    tags: [
      { label: 'Business Logic & Refactoring', value: 86 },
      { label: 'Legacy Modernization', value: 92 },
      { label: 'Enterprise Systems', value: 89 },
      { label: 'Authentication (JWT, OAuth2)', value: 92 },
      { label: 'API versioning', value: 72 },
      { label: 'Logging & observability', value: 64 },
      { label: 'Dependency injection', value: 73 },
      { label: 'Middleware patterns', value: 91 },
      { label: 'API gateways', value: 85 },
      { label: 'Payment integrations (Stripe, etc.)', value: 32 },
      { label: 'Webhooks handling', value: 82 },
      { label: 'Notification systems', value: 73 },
      { label: 'GraphQL APIs', value: 46 },
      { label: 'WebSockets / real-time systems', value: 67 },
    ],
  },
  {
    titleKey: 'skills.ar1102Title',
    moduleId: 'AR-1102',
    statusKey: 'skills.ar1102Status',
    columns: 5,
    metrics: [
      { label: 'Clean Architecture', value: 94 },
      { label: 'REST API Design', value: 87 },
      { label: 'Microservices Mindset', value: 84 },
      { label: 'Domain-Driven Design (DDD)', value: 37 },
      { label: 'OpenAPI specification', value: 70 },
      { label: 'Reverse proxies (NGINX)', value: 78 },
      { label: 'API security (CORS, CSP)', value: 82 },
    ],
    tags: [
      { label: 'Controller/Service/Repository', value: 88 },
      { label: 'Scalability', value: 86 },
      { label: 'Maintainability', value: 90 },
    ],
  },
  {
    titleKey: 'skills.qa4401Title',
    moduleId: 'QA-4401',
    statusKey: 'skills.qa4401Status',
    columns: 5,
    metrics: [
      { label: 'Unit Test (xUnit/NUnit)', value: 90 },
      { label: 'Integration Test', value: 88 },
      { label: 'End-to-end testing (Cypress, Playwright)', value: 52 },
      { label: 'API testing (Postman, Supertest)', value: 85 },
      { label: 'Debugging (IDE tools, logs)', value: 97 },
    ],
    tags: [
      { label: 'Testing First Mindset', value: 71 },
      { label: 'Linting (ESLint, Prettier)', value: 89 },
      { label: 'Reliability', value: 89 },
      { label: 'Code Standards', value: 87 },
    ],
  },
  {
    titleKey: 'skills.db7300Title',
    moduleId: 'DB-7300',
    statusKey: 'skills.db7300Status',
    columns: 7,
    metrics: [
      { label: 'PostgreSQL', value: 97 },
      { label: 'SQL Server', value: 92 },
      { label: 'MySQL', value: 84 },
      { label: 'MariaDB', value: 85 },
      { label: 'Oracle', value: 67 },
      { label: 'Elasticsearch', value: 79 },
      { label: 'Entity Framework', value: 92 },
    ],
    tags: [
      { label: 'Relational Databases', value: 91 },
      { label: 'Query Optimization', value: 83 },
      { label: 'Data Consistency', value: 88 },
      { label: 'Schema design', value: 75 },
      { label: 'Data validation', value: 84 },
      { label: 'Soft deletes', value: 90 },
    ],
  },
  {
    titleKey: 'skills.dx9901Title',
    moduleId: 'DX-9901',
    statusKey: 'skills.dx9901Status',
    columns: 7,
    metrics: [
      { label: 'Docker & Containerization', value: 86 },
      { label: 'CI/CD Pipelines', value: 88 },
      { label: 'Monitoring (Grafana)', value: 82 },
      { label: 'AWS (EC2, S3, RDS, Lambda)', value: 50 },
      { label: 'Azure basics', value: 71 },
      { label: 'Monitoring (Prometheus)', value: 75 },
      { label: 'Environment configs (.env, secrets)', value: 89 },
      { label: 'Versioning & releases', value: 90 },
      { label: 'CDN (Cloudflare)', value: 64 },
      { label: 'SSL/TLS setup', value: 81 },
      { label: 'DNS management', value: 86 },
      { label: 'Load testing in CI', value: 91 },
      { label: 'Observability', value: 66 },
      { label: 'Incident response', value: 70 },
      { label: 'Rollbacks', value: 88 },
    ],
    tags: [
      { label: 'GitHub Actions', value: 87 },
      { label: 'Linux/VPS', value: 80 },
      { label: 'Release Workflow', value: 85 },
    ],
  },
  {
    titleKey: 'skills.fs2088Title',
    moduleId: 'FS-2088',
    statusKey: 'skills.fs2088Status',
    statusTone: 'orange',
    borderTone: 'orange',
    columns: 5,
    icon: 'rocket_launch',
    metrics: [
      { label: 'React + Flutter Product Build', value: 84, tone: 'orange' },
      { label: 'LLM integration', value: 49, tone: 'orange' },
      { label: 'Prompt engineering', value: 67, tone: 'orange' },
      { label: 'AI-Assisted Development', value: 90, tone: 'orange' },
      { label: 'Realtime Features', value: 81, tone: 'orange' },
      { label: 'AI chatbots', value: 26, tone: 'orange' },
      { label: 'Context management', value: 72, tone: 'orange' },
      { label: 'AI UX design', value: 89, tone: 'orange' },
    ],
    tags: [{ label: 'Product Mindset', value: 88 }],
  },
]

// skillsBottomPanel strings moved to i18n (skills.bottomTitle / bottomDesc / uptime)

