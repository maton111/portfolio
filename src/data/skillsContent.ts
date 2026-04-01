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
  eyebrow: 'System_Protocol: SKILLS_MANIFEST',
  titleStart: 'TECHNICAL',
  titleAccent: 'STACK',
  titleEnd: 'ARCHITECTURE',
}

export const skillsModules: SkillModule[] = [
  {
    title: '.NET BACKEND ARCHITECTURE',
    moduleId: 'BE-8800',
    status: 'STABLE_STACK',
    columns: 7,
    metrics: [
      { label: 'ASP.NET Core / Web API', value: 95 },
      { label: 'C# Entity Framework', value: 92 },
      { label: 'Microservices Architecture', value: 85 },
    ],
    tags: ['PostgreSQL', 'Redis', 'RabbitMQ'],
  },
  {
    title: 'REACT INTERFACE',
    moduleId: 'UI-4200',
    status: 'L04_MASTER',
    columns: 5,
    metrics: [
      { label: 'React / Next.js', value: 90 },
      { label: 'Tailwind CSS / Motion', value: 94 },
    ],
    tags: ['TypeScript', 'Redux'],
  },
  {
    title: 'FLUTTER MOBILE',
    moduleId: 'MB-1200',
    status: 'LEVELING_UP',
    statusTone: 'orange',
    borderTone: 'orange',
    columns: 5,
    icon: 'rocket_launch',
    metrics: [{ label: 'Flutter / Dart SDK', value: 78, tone: 'orange' }],
    tags: ['Riverpod', 'Firebase'],
  },
  {
    title: 'DEVOPS & ORCHESTRATION',
    moduleId: 'DX-9901',
    status: 'SYSTEM_READY',
    columns: 7,
    metrics: [
      { label: 'Docker / K8s', value: 82 },
      { label: 'GitHub Actions / CI', value: 88 },
      { label: 'Azure Cloud', value: 75 },
      { label: 'Terraform / IaC', value: 60, tone: 'orange' },
    ],
    tags: ['Azure DevOps', 'Prometheus', 'Grafana'],
  },
]

export const skillsBottomPanel = {
  title: 'Neural_Link: ACTIVE',
  description:
    'Continuously aggregating data across Distributed Systems and Edge Computing protocols.',
  lastUpdate: '2026.04.01.14:32',
  uptime: '99.98%',
}

