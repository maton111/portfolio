import {useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {directChannels, externalNodes} from '../data/contactContent'
import {useContactForm} from '../hooks/useContactForm'
import turinImage from '../assets/turin.png'
import {useReveal} from '../hooks/useReveal'
import './ContactSection.css'
import SystemLocationGlobe from "../components/ui/SystemLocationGlobe.tsx";

function ContactSection() {
  const { t } = useTranslation()
  const { isLoading, error, success, submitForm, resetForm } = useContactForm()
  const formRef = useRef<HTMLFormElement>(null)
  const gridRevealRef = useReveal<HTMLDivElement>(0.05)
  const isExternalLink = (href: string) => href.startsWith('http')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const msg = formData.get('message') as string
    const honeypot = formData.get('website') as string

    await submitForm({ name, email, subject, message: msg, honeypot })
    formRef.current?.reset()
  }

  const handleReset = () => {
    resetForm()
    formRef.current?.reset()
  }

  const transmissionState = success ? 'sent' : isLoading ? 'sending' : error ? 'error' : 'idle'

  const stateLabel = {
    idle: t('contact.stateIdle'),
    sending: t('contact.stateSending'),
    sent: `✓ ${t('contact.stateDelivered')}`,
    error: `✗ ${t('contact.stateError')}`,
  }[transmissionState]

  const statusLines = [
    t('contact.statusLine1'),
    t('contact.statusLine2'),
    t('contact.statusLine3'),
  ]

  const allChannels = [...directChannels, ...externalNodes]

  const subjectOptions = [
    t('contact.subject1'),
    t('contact.subject2'),
    t('contact.subject3'),
    t('contact.subject4'),
  ]

  return (
    <section className="contact-page" id="contact" aria-labelledby="contact-title">
      <div className="contact-content">
        <div className="contact-hud-meta" aria-hidden="true">
          {statusLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div ref={gridRevealRef} className="contact-grid reveal-target">
          <div className="contact-main">
            <header>
              <h2 id="contact-title" className="reveal-heading">
                {t('contact.titleTop')}
                <br />
                <span>{t('contact.titleAccent')}</span>
              </h2>
              <p>
                {t('contact.description').replace('< 24h', '')}
                <span>&lt; 24h</span>.
              </p>
            </header>

            <div className="contact-panel">
              <div className="corner top-right" aria-hidden="true" />
              <div className="corner bottom-left" aria-hidden="true" />

              <div className="contact-transmission-header">
                <span className="contact-eyebrow">&gt; TRANSMISSION_STATE</span>
                <span className={`contact-state-badge state-${transmissionState}`} aria-live="polite">
                  {stateLabel}
                </span>
              </div>

              {success ? (
                <div className="contact-success" role="status">
                  <span className="material-symbols-outlined" aria-hidden="true">task_alt</span>
                  <h3>{t('contact.successTitle')}</h3>
                  <p>{t('contact.successSub')}</p>
                  <button type="button" onClick={handleReset}>
                    <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
                    {t('contact.successReset')}
                  </button>
                </div>
              ) : (
                <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                  <div className="contact-form-grid">
                    <label>
                      <span>{t('contact.fieldName')}</span>
                      <input placeholder={t('contact.placeholderName')} type="text" name="name" autoComplete="name" required />
                    </label>
                    <label>
                      <span>{t('contact.fieldEmail')}</span>
                      <input placeholder={t('contact.placeholderEmail')} type="email" name="email" autoComplete="email" required />
                    </label>
                  </div>

                  <label>
                    <span>{t('contact.fieldSubject')}</span>
                    <select defaultValue="" name="subject" required>
                      <option value="" disabled hidden>
                        {t('contact.placeholderSubject')}
                      </option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>{t('contact.fieldMessage')}</span>
                    <textarea placeholder={t('contact.placeholderMessage')} rows={5} name="message" required />
                  </label>

                  {/* Honeypot field for anti-spam */}
                  <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  {error && (
                    <div className="form-error" role="alert">✗ {error}</div>
                  )}

                  <div className="contact-form-footer">
                    <span className="contact-sla-label">{t('contact.responseSla')}</span>
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? t('contact.submitLoading') : t('contact.submitIdle')}
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {isLoading ? 'hourglass_empty' : 'bolt'}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <aside className="contact-sidebar">
            <section className="contact-node-panel" aria-label={t('contact.externalNodes')}>
              <h3 className="contact-eyebrow">{t('contact.externalNodes')}</h3>
              <div className="contact-node-list">
                {allChannels.map((channel) => (
                  <a
                    href={channel.href}
                    key={channel.label}
                    className="contact-node-row"
                    target={isExternalLink(channel.href) ? '_blank' : undefined}
                    rel={isExternalLink(channel.href) ? 'noopener noreferrer' : undefined}
                    aria-label={t('contact.openLinkAriaLabel', { label: channel.label })}
                  >
                    <i className="material-symbols-outlined contact-node-icon" aria-hidden="true">{channel.icon}</i>
                    <div className="contact-node-info">
                      <span className="contact-node-label">{channel.label}</span>
                      <span className="contact-node-id">{channel.id}</span>
                    </div>
                    <i className="material-symbols-outlined contact-node-arrow" aria-hidden="true">north_east</i>
                  </a>
                ))}
              </div>
            </section>

            <section className="contact-node-panel tone-green stagger-child" aria-label={t('contact.coordinatesLabel')}>
              <h3 className="contact-eyebrow">{t('contact.coordinatesLabel')}</h3>
              <SystemLocationGlobe fallbackImage={turinImage} />
              <p className="contact-coordinates-footer">{t('contact.coordinatesFooter')}</p>
            </section>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default ContactSection