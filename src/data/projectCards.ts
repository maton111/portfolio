import teamsystemSvg from '../assets/teamsystem_enterprise_backend_hero.svg'
import legacySvg from '../assets/legacy_refactoring_hero.svg'
import opcmHeroBannerSvg from '../assets/opcm_hero_banner.svg'
import neuroscopeSvg from '../assets/neuroscope_svg_image.svg'
import lifewrappedHeroSvg from '../assets/lifewrapped_hero.svg'

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
  githubUrl?: string
  demoUrl?: string
}

// Structural data only — strings (title, description) are resolved via i18n in ProjectsSection/ProjectNotesPage
export const projectCards: ProjectCard[] = [
  {
    id: 'TS-API-01',
    slug: 'teamsystem-enterprise-backend',
    title: 'TeamSystem Enterprise Backend',
    difficulty: 'Enterprise',
    description: '',
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
    description: '',
    tags: ['Clean Architecture', 'xUnit/NUnit', 'Integration Test'],
    icon: 'sync_alt',
    backgroundImage: legacySvg,
    visual: 'vault',
  },
  {
    id: 'NS-CV-03',
    slug: 'neuro-scope',
    title: 'NeuroScope',
    difficulty: 'Product',
    description: '',
    tags: ['Next.js 15', 'TypeScript', 'MediaPipe', 'WebAssembly', 'Recharts', 'Vercel'],
    icon: 'psychology',
    visual: 'circuit',
    backgroundImage: neuroscopeSvg,
    githubUrl: 'https://github.com/maton111/neuro-scope',
    demoUrl: 'https://neuro-scope-fxy1.vercel.app',
  },
  {
    id: 'OPCM-APP-04',
    slug: 'opcm',
    title: 'One Piece Card Market (OPCM)',
    difficulty: 'Product',
    description: '',
    tags: ['ASP.NET Core 8', 'Windows Forms', 'PostgreSQL', 'EF Core', 'REST API'],
    icon: 'collections_bookmark',
    backgroundImage: opcmHeroBannerSvg,
    visual: 'circuit',
  },
  {
    id: 'ELC-CORE-05',
    slug: 'everyday-life-core',
    title: 'Everyday Life Core',
    difficulty: 'Product',
    description: '',
    tags: ['.NET', 'React', 'Flutter', 'PostgreSQL', 'WebSocket'],
    icon: 'rocket_launch',
    tone: 'orange',
    visual: 'kernel',
    featured: true,
  },
  {
    id: 'LW-WEB-06',
    slug: 'life-wrapped',
    title: 'LifeWrapped',
    difficulty: 'Product',
    description: '',
    tags: ['Next.js 16', 'React 19', '.NET 8', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Railway'],
    icon: 'auto_awesome_mosaic',
    visual: 'circuit',
    backgroundImage: lifewrappedHeroSvg,
    githubUrl: 'https://github.com/maton111/lifewrapped',
  },
]
