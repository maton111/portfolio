export type LogEntry = {
  date: string
  title: string
  note: string
  tone?: 'green' | 'secondary' | 'orange' | 'muted'
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
