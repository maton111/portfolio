import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { directChannels, externalNodes } from '../data/contactContent'
import { useContactForm } from '../hooks/useContactForm'
import SystemLocationGlobe from '../components/ui/SystemLocationGlobe'
import turinImage from '../assets/turin.png'
import './ContactSection.css'

function ContactSection() {
  const { t } = useTranslation()
  const { isLoading, error, success, message, submitForm } = useContactForm()
  const formRef = useRef<HTMLFormElement>(null)
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

    if (!error) {
      formRef.current.reset()
    }
  }

  const statusLines = [
    t('contact.statusLine1'),
    t('contact.statusLine2'),
    t('contact.statusLine3'),
  ]

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

        <div className="contact-grid">
          <div className="contact-main">
            <header>
              <h2 id="contact-title">
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
                  <div className="form-error" role="alert">
                    ❌ {error}
                  </div>
                )}

                {success && message && (
                  <div className="form-success" role="status">
                    ✅ {message}
                  </div>
                )}

                <button type="submit" disabled={isLoading}>
                  {isLoading ? t('contact.submitLoading') : t('contact.submitIdle')}
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {isLoading ? 'hourglass_empty' : 'sensors'}
                  </span>
                </button>
              </form>
            </div>
          </div>

          <aside className="contact-sidebar">
            <section className="contact-node-panel tone-green">
              <h3>
                <span aria-hidden="true" />
                {t('contact.directChannel')}
              </h3>
              <div>
                {directChannels.map((channel) => (
                  <a
                    href={channel.href}
                    key={channel.label}
                    target={isExternalLink(channel.href) ? '_blank' : undefined}
                    rel={isExternalLink(channel.href) ? 'noopener noreferrer' : undefined}
                    aria-label={`Open ${channel.label}`}
                  >
                    <span>
                      <i className="material-symbols-outlined" aria-hidden="true">{channel.icon}</i>
                      {channel.label}
                    </span>
                    <i className="material-symbols-outlined" aria-hidden="true">arrow_forward_ios</i>
                  </a>
                ))}
              </div>
            </section>

            <section className="contact-node-panel tone-orange">
              <h3>
                <span aria-hidden="true" />
                {t('contact.externalNodes')}
              </h3>
              <div>
                {externalNodes.map((node) => (
                  <a
                    href={node.href}
                    key={node.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${node.label} in a new tab`}
                  >
                    <span>
                      <i className="material-symbols-outlined" aria-hidden="true">{node.icon}</i>
                      {node.label}
                    </span>
                    <i className="material-symbols-outlined" aria-hidden="true">arrow_forward_ios</i>
                  </a>
                ))}
              </div>
            </section>

            <section className="contact-node-panel tone-green">
              <h3>
                <span aria-hidden="true" />
                {t('contact.systemLocation')}
              </h3>
              <SystemLocationGlobe locationLabel={t('contact.locationLabel')} fallbackImage={turinImage} />
            </section>

            <section className="contact-scanner" aria-label="System scanner">
              <div className="contact-scanner-track">
                <div className="contact-scanner-group">
                  <span>{t('contact.scanner')}</span>
                  <span>{t('contact.scanner')}</span>
                </div>
                <div className="contact-scanner-group" aria-hidden="true">
                  <span>{t('contact.scanner')}</span>
                  <span>{t('contact.scanner')}</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
