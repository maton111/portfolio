export const contactHeader = {
  titleTop: 'OPEN CONTACT',
  titleAccent: 'MAIN CHANNEL',
  description:
    'Secure comms channel established. Input your parameters to sync with the main node. Response latency: < 24h',
}

export const contactSubjectOptions = [
  'JOB_OPPORTUNITY',
  'PROJECT_DISCOVERY',
  'COLLABORATION',
  'GENERAL_MESSAGE',
]

export type ExternalNode = {
  label: string
  icon: string
  href: `https://${string}`
}

export type DirectChannel = {
  label: string
  icon: string
  href: string
}

export const directChannels: DirectChannel[] = [
  { label: 'EMAIL', icon: 'mail', href: 'mailto:archinamattia@gmail.com' },
]

export const externalNodes: ExternalNode[] = [
  { label: 'GITHUB', icon: 'terminal', href: 'https://github.com' },
  { label: 'LINKEDIN', icon: 'lan', href: 'https://linkedin.com' },
  { label: 'INSTAGRAM', icon: 'photo_camera', href: 'https://www.instagram.com/maton11' },
]

export const systemHud = {
  statusLines: [
    'System_Status: Open to work',
    'Primary_Role: Backend Developer (.NET)',
    'Node_ID: TORINO_10139',
  ],
  locationLabel: 'Torino_Core // ITA',
  scanner:
    'SYSTEM LOAD: OPTIMAL • RESPONSE SLA: < 24H • STACK: .NET / REACT / FLUTTER • CONNECTION: STABLE •',
}
