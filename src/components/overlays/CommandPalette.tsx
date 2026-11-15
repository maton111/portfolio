import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { blogPosts } from '../../data/blogPosts'
import { directChannels, externalNodes } from '../../data/contactContent'
import { projectCards } from '../../data/projectCards'
import { SECTION_IDS, type SectionId } from '../../data/sectionNavigation'
import { scrollToSection } from '../../hooks/useSectionScroll'
import { useTheme } from '../../hooks/useTheme'
import { OPEN_PALETTE_EVENT } from '../../utils/commandPalette'
import cvFile from '../../assets/CV - Mattia Archinà.pdf'
import './CommandPalette.css'

type Command = {
  id: string
  group: string
  label: string
  hint?: string
  icon: string
  keywords?: string
  run: () => void
}

const SECTION_ICONS: Record<SectionId, string> = {
  home: 'home',
  about: 'person',
  skills: 'terminal',
  projects: 'deployed_code',
  timeline: 'timeline',
  blog: 'article',
  contact: 'mail',
}

const PROJECT_TITLE_KEYS: Record<string, string> = {
  'teamsystem-enterprise-backend': 'projects.proj1Title',
  'legacy-refactoring-program': 'projects.proj2Title',
  'neuro-scope': 'projects.proj3Title',
  opcm: 'projects.proj4Title',
  'everyday-life-core': 'projects.proj5Title',
  'life-wrapped': 'projects.proj6Title',
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

function CommandPalette() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const listboxId = useId()
  const isIT = i18n.language === 'it'

  const open = useCallback(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    setQuery('')
    setActiveIndex(0)
    setCopied(false)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    restoreFocusRef.current?.focus?.()
  }, [])

  // Global shortcut (Ctrl/⌘ + K) and programmatic open.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (isOpen) close()
        else open()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener(OPEN_PALETTE_EVENT, open)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(OPEN_PALETTE_EVENT, open)
    }
  }, [isOpen, open, close])

  // Lock page scroll and focus the input while open.
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const commands = useMemo<Command[]>(() => {
    const goToSection = (id: SectionId) => {
      if (location.pathname === '/') scrollToSection(id)
      else navigate(id === 'home' ? '/' : `/#${id}`)
    }

    const email = directChannels[0]?.id ?? ''
    const groupNavigate = t('palette.groupNavigate')
    const groupProjects = t('palette.groupProjects')
    const groupBlog = t('palette.groupBlog')
    const groupActions = t('palette.groupActions')
    const groupLinks = t('palette.groupLinks')

    return [
      ...SECTION_IDS.map((id) => ({
        id: `section-${id}`,
        group: groupNavigate,
        label: t(`navbar.${id}`),
        icon: SECTION_ICONS[id],
        keywords: id,
        run: () => goToSection(id),
      })),
      {
        id: 'blog-archive',
        group: groupNavigate,
        label: t('palette.blogArchive'),
        icon: 'inventory_2',
        keywords: 'blog archive archivio log',
        run: () => navigate('/blog'),
      },
      ...projectCards.map((project) => ({
        id: `project-${project.slug}`,
        group: groupProjects,
        label: t(PROJECT_TITLE_KEYS[project.slug] ?? '', { defaultValue: project.title }),
        hint: project.id,
        icon: project.icon,
        keywords: project.tags.join(' '),
        run: () => navigate(`/projects/${project.slug}`),
      })),
      ...blogPosts.map((post) => ({
        id: `post-${post.slug}`,
        group: groupBlog,
        label: isIT ? post.titleIT : post.titleEN,
        hint: post.id,
        icon: post.icon,
        keywords: `${post.tagEN} ${post.tagIT}`,
        run: () => navigate(`/blog/${post.slug}`),
      })),
      {
        id: 'action-theme',
        group: groupActions,
        label: theme === 'dark' ? t('palette.themeLight') : t('palette.themeDark'),
        icon: theme === 'dark' ? 'light_mode' : 'dark_mode',
        keywords: 'theme tema dark light chiaro scuro',
        run: toggleTheme,
      },
      {
        id: 'action-lang',
        group: groupActions,
        label: t('palette.switchLang'),
        hint: isIT ? 'IT → EN' : 'EN → IT',
        icon: 'translate',
        keywords: 'language lingua english italiano',
        run: () => {
          void i18n.changeLanguage(isIT ? 'en' : 'it')
        },
      },
      {
        id: 'action-cv',
        group: groupActions,
        label: t('palette.downloadCv'),
        hint: 'PDF',
        icon: 'download',
        keywords: 'cv resume curriculum',
        run: () => {
          const link = document.createElement('a')
          link.href = cvFile
          link.download = 'CV-Mattia-Archina.pdf'
          link.click()
        },
      },
      {
        id: 'action-copy-email',
        group: groupActions,
        label: copied ? t('palette.emailCopied') : t('palette.copyEmail'),
        hint: email,
        icon: copied ? 'check' : 'content_copy',
        keywords: 'email mail contatto contact',
        run: () => {
          void navigator.clipboard?.writeText(email).then(() => setCopied(true))
        },
      },
      ...externalNodes.map((node) => ({
        id: `link-${node.label}`,
        group: groupLinks,
        label: node.label.charAt(0) + node.label.slice(1).toLowerCase(),
        hint: node.id,
        icon: 'north_east',
        keywords: node.href,
        run: () => {
          window.open(node.href, '_blank', 'noopener,noreferrer')
        },
      })),
    ]
  }, [t, i18n, isIT, theme, toggleTheme, navigate, location.pathname, copied])

  const filtered = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean)
    if (!terms.length) return commands
    return commands.filter((command) => {
      const haystack = normalize(`${command.label} ${command.group} ${command.hint ?? ''} ${command.keywords ?? ''}`)
      return terms.every((term) => haystack.includes(term))
    })
  }, [commands, query])

  const safeIndex = Math.min(activeIndex, Math.max(0, filtered.length - 1))

  useEffect(() => {
    if (!isOpen) return
    listRef.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [safeIndex, isOpen])

  if (!isOpen) return null

  const runCommand = (command: Command) => {
    command.run()
    // Copy keeps the palette open so the confirmation is visible.
    if (command.id !== 'action-copy-email') close()
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(filtered.length ? (safeIndex + 1) % filtered.length : 0)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(filtered.length ? (safeIndex - 1 + filtered.length) % filtered.length : 0)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const command = filtered[safeIndex]
      if (command) runCommand(command)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      close()
    } else if (event.key === 'Tab') {
      // Single focusable control: keep focus inside the dialog.
      event.preventDefault()
    }
  }

  let lastGroup = ''

  return (
    <div className="cmdk-backdrop" onMouseDown={close}>
      <div
        className="cmdk-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t('palette.ariaLabel')}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <span className="cmdk-corner cmdk-corner-tr" aria-hidden="true" />
        <span className="cmdk-corner cmdk-corner-bl" aria-hidden="true" />

        <div className="cmdk-input-row">
          <span className="cmdk-prompt" aria-hidden="true">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={onInputKeyDown}
            placeholder={t('palette.placeholder')}
            role="combobox"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-activedescendant={filtered[safeIndex] ? `${listboxId}-${filtered[safeIndex].id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>esc</kbd>
        </div>

        <div className="cmdk-list" id={listboxId} role="listbox" ref={listRef} aria-label={t('palette.ariaLabel')}>
          {filtered.length === 0 ? (
            <p className="cmdk-empty">
              <span className="material-symbols-outlined" aria-hidden="true">search_off</span>
              {t('palette.empty', { query })}
            </p>
          ) : (
            filtered.map((command, index) => {
              const showGroup = command.group !== lastGroup
              lastGroup = command.group
              const isActive = index === safeIndex
              return (
                <div key={command.id} role="presentation">
                  {showGroup ? <p className="cmdk-group" role="presentation">{command.group}</p> : null}
                  <div
                    id={`${listboxId}-${command.id}`}
                    role="option"
                    aria-selected={isActive}
                    className={`cmdk-item${isActive ? ' is-active' : ''}`}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => runCommand(command)}
                  >
                    <span className="material-symbols-outlined cmdk-item-icon" aria-hidden="true">{command.icon}</span>
                    <span className="cmdk-item-label">{command.label}</span>
                    {command.hint ? <span className="cmdk-item-hint">{command.hint}</span> : null}
                    <span className="material-symbols-outlined cmdk-item-enter" aria-hidden="true">keyboard_return</span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <footer className="cmdk-footer" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> {t('palette.hintNavigate')}</span>
          <span><kbd>↵</kbd> {t('palette.hintSelect')}</span>
          <span className="cmdk-footer-brand">maton11 // cmd</span>
        </footer>
      </div>
    </div>
  )
}

export default CommandPalette
