export const contactHeader = {
  titleTop: 'INITIALIZE',
  titleAccent: 'TRANSMISSION',
  description:
    'Secure comms channel established. Input your parameters to sync with the main node. Response latency: < 24h.',
}

export const contactSubjectOptions = [
  'PROJECT_INQUIRY',
  'COLLABORATION_REQUEST',
  'TECHNICAL_SUPPORT',
  'GENERAL_HELLO',
]

export type ExternalNode = {
  label: string
  icon: string
  href: `https://${string}`
}

export const externalNodes: ExternalNode[] = [
  { label: 'GITHUB', icon: 'terminal', href: 'https://github.com' },
  { label: 'LINKEDIN', icon: 'lan', href: 'https://linkedin.com' },
  { label: 'TWITTER', icon: 'alternate_email', href: 'https://x.com' },
]

export const systemHud = {
  statusLines: [
    'System_Status: Online',
    'Encryption: Active',
    'Node_ID: 0x88FF00',
  ],
  locationLabel: 'Milan_Core // ITA',
  scanner:
    'SYSTEM LOAD: OPTIMAL • LATENCY: 24MS • ENCRYPTION: AES-256 • CONNECTION: STABLE •',
}

