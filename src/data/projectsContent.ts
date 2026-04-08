// Re-exports for backwards compatibility — import from the specific files for new code.
export type { ProjectCard } from './projectCards'
export { projectsHeader, projectCards } from './projectCards'

export type { ProjectNotes, ProjectNotesSection } from './projectNotes'
export { projectNotes, getProjectNotesBySlug } from './projectNotes'

export type { LogEntry } from './careerTimeline'
export { systemLogs, repoStatus } from './careerTimeline'
