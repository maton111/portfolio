export type ProjectCard = {
  id: string
  title: string
  difficulty: 'Hard' | 'Medium' | 'Extreme'
  description: string
  tags: string[]
  icon: string
  tone?: 'green' | 'orange'
  visual: 'circuit' | 'vault' | 'kernel'
  featured?: boolean
}

export type LogEntry = {
  date: string
  title: string
  note: string
  tone?: 'green' | 'secondary' | 'orange' | 'muted'
}

export const projectsHeader = {
  eyebrow: 'Mission_Control // Projects',
  titleTop: 'DEPLOYMENT',
  titleBottom: 'MODULES',
  intro:
    'A curated selection of high-frequency digital architectures. Each module represents a solved computational challenge within the Neon Protocol.',
}

export const projectCards: ProjectCard[] = [
  {
    id: 'ARCH-01',
    title: 'Cyber_Core V2',
    difficulty: 'Hard',
    description:
      'Next-generation neural network interface designed for high-throughput data processing and real-time visualization.',
    tags: ['Rust', 'WebAssembly', 'Three.js'],
    icon: 'terminal',
    visual: 'circuit',
  },
  {
    id: 'ARCH-02',
    title: 'Void_Vault',
    difficulty: 'Medium',
    description:
      'Encrypted decentralized storage solution leveraging IPFS and custom encryption protocols for secure file transit.',
    tags: ['Next.js', 'Solidity', 'IPFS'],
    icon: 'database',
    visual: 'vault',
  },
  {
    id: 'ARCH-03 // PRIORITY_ALPHA',
    title: 'System_Stable OS',
    difficulty: 'Extreme',
    description:
      'A custom-built operating system environment for embedded tactical devices with low-latency kernel and modular drivers.',
    tags: ['C++ 20', 'Assembly', 'RTOS'],
    icon: 'memory',
    tone: 'orange',
    visual: 'kernel',
    featured: true,
  },
]

export const systemLogs: LogEntry[] = [
  {
    date: '2026.03.28 // 14:30',
    title: 'Cyber_Core V2 Deployed',
    note: 'Final handshake protocol optimized.',
    tone: 'green',
  },
  {
    date: '2026.03.21 // 09:12',
    title: 'Vault Encryption Update',
    note: 'Quantum resistance patch applied.',
    tone: 'secondary',
  },
  {
    date: '2026.03.10 // 23:45',
    title: 'Module ARCH-03 Initialized',
    note: 'Baseline kernel stability achieved.',
    tone: 'orange',
  },
  {
    date: '2026.02.27 // 11:00',
    title: 'System Audit Complete',
    note: 'No anomalies detected.',
    tone: 'muted',
  },
]

export const repoStatus = {
  efficiency: '98% Efficient',
  filledBars: 49,
  totalBars: 50,
}

