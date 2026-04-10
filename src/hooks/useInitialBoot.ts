import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BOOT_STORAGE_KEY, bootTasks } from '../data/bootSequence'

type UseInitialBootResult = {
  isBootVisible: boolean
  isPageGlitching: boolean
  progress: number
  activeLabel: string
  logs: string[]
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomHex = () => Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0')

const timestamp = () => {
  const now = new Date()
  return now.toTimeString().slice(0, 8)
}

const formatLog = (template: string) =>
  template
    .replace('{hex}', `0x${randomHex()}`)
    .replace('{ms}', String(randomBetween(14, 79)))

export function useInitialBoot(): UseInitialBootResult {
  const { t } = useTranslation()
  const initialVisible =
    typeof window !== 'undefined' && !window.sessionStorage.getItem(BOOT_STORAGE_KEY)

  const [isBootVisible, setIsBootVisible] = useState(initialVisible)
  const [isPageGlitching, setIsPageGlitching] = useState(false)
  const [progress, setProgress] = useState(initialVisible ? 0 : 100)
  const [taskIndex, setTaskIndex] = useState(0)
  const [logs, setLogs] = useState<string[]>([
    `[${timestamp()}] [ OK ] KERNEL_WAKE_SEQUENCE // PID:0x00af`,
  ])

  const ranges = useMemo(() => {
    return bootTasks
      .reduce(
        (acc, task) => {
          const start = acc.total
          const end = start + task.weight
          return { total: end, items: [...acc.items, { start, end }] }
        },
        { total: 0, items: [] as Array<{ start: number; end: number }> },
      )
      .items
  }, [])

  useEffect(() => {
    if (!isBootVisible) {
      return
    }

    let canceled = false
    const intervalIds: number[] = []
    const timeoutIds: number[] = []

    const clearTrackedTimers = () => {
      intervalIds.forEach((id) => window.clearInterval(id))
      timeoutIds.forEach((id) => window.clearTimeout(id))
    }

    const scheduleTimeout = (callback: () => void, delay: number) => {
      const id = window.setTimeout(callback, delay)
      timeoutIds.push(id)
      return id
    }

    const runTask = (index: number) => {
      if (canceled) {
        return
      }

      const task = bootTasks[index]
      if (!task) {
        setProgress(100)
        window.sessionStorage.setItem(BOOT_STORAGE_KEY, '1')
        scheduleTimeout(() => {
          if (!canceled) {
            setIsBootVisible(false)
            setIsPageGlitching(true)
            scheduleTimeout(() => {
              if (!canceled) {
                setIsPageGlitching(false)
              }
            }, 760)
          }
        }, 380)
        return
      }

      const { start, end } = ranges[index]
      const duration = randomBetween(task.minMs, task.maxMs)
      const ticks = Math.max(6, Math.floor(duration / 45))
      const delta = (end - start) / ticks
      let currentTick = 0

      setLogs((prev) => [
        ...prev.slice(-8),
        `[${timestamp()}] [ RUN ] ${task.label.toUpperCase()}`,
      ])

      const timer = window.setInterval(() => {
        if (canceled) {
          window.clearInterval(timer)
          return
        }

        currentTick += 1
        const nextValue = clamp(start + currentTick * delta, start, end)
        setProgress(nextValue)

        if (currentTick >= ticks) {
          window.clearInterval(timer)
          setProgress(end)
          setLogs((prev) => [
            ...prev.slice(-8),
            `[${timestamp()}] [ OK ] ${formatLog(task.logTemplate)}`,
          ])
          setTaskIndex(index + 1)
        }
      }, Math.max(34, Math.floor(duration / ticks)))

      intervalIds.push(timer)
    }

    runTask(taskIndex)

    return () => {
      canceled = true
      clearTrackedTimers()
    }
  }, [isBootVisible, ranges, taskIndex])

  return {
    isBootVisible,
    isPageGlitching,
    progress: Math.round(progress),
    activeLabel: progress >= 100
      ? t('boot.initComplete')
      : t(`boot.${bootTasks[Math.min(taskIndex, bootTasks.length - 1)]?.id ?? ''}`, { defaultValue: t('boot.initFallback') }),
    logs,
  }
}


