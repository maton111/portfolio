// Structural data only — strings are resolved via i18n in ContactSection

export type ExternalNode = {
  label: string
  icon: string
  href: `https://${string}`
  id: string
}

export type DirectChannel = {
  label: string
  icon: string
  href: string
  id: string
}

export const directChannels: DirectChannel[] = [
  { label: 'EMAIL', icon: 'mail', href: 'mailto:archinamattia@gmail.com', id: 'archinamattia@gmail.com' },
]

export const externalNodes: ExternalNode[] = [
  { label: 'GITHUB', icon: 'terminal', href: 'https://github.com/maton111', id: '@maton111' },
  { label: 'LINKEDIN', icon: 'lan', href: 'https://www.linkedin.com/in/mattia-archin%C3%A0/', id: '@mattia-archinà' },
  { label: 'INSTAGRAM', icon: 'photo_camera', href: 'https://www.instagram.com/maton11', id: '@maton11' },
]
