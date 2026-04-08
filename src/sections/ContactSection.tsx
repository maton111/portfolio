import {useRef} from 'react'
import {contactHeader, contactSubjectOptions, directChannels, externalNodes, systemHud,} from '../data/contactContent'
import {useContactForm} from '../hooks/useContactForm'
import SystemLocationGlobe from '../components/ui/SystemLocationGlobe'
import turinImage from '../assets/turin.png'
import './ContactSection.css'

function ContactSection() {
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
    const message = formData.get('message') as string
    const honeypot = formData.get('website') as string

    await submitForm({ name, email, subject, message, honeypot })

    if (!error) {
      formRef.current.reset()
    }
  }

  return (
    <section className="contact-page" id="contact" aria-labelledby="contact-title">
      <div className="contact-content">
        <div className="contact-hud-meta" aria-hidden="true">
          {systemHud.statusLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="contact-grid">
          <div className="contact-main">
            <header>
              <h2 id="contact-title">
                {contactHeader.titleTop}
                <br />
                <span>{contactHeader.titleAccent}</span>
              </h2>
              <p>
                {contactHeader.description.replace('< 24h', '')}
                <span>&lt; 24h</span>.
              </p>
            </header>

            <div className="contact-panel">
              <div className="corner top-right" aria-hidden="true" />
              <div className="corner bottom-left" aria-hidden="true" />

              <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                <div className="contact-form-grid">
                  <label>
                    <span>&gt; NAME:</span>
                    <input placeholder="USER_IDENTIFIER" type="text" name="name" autoComplete="name" required />
                  </label>

                  <label>
                    <span>&gt; EMAIL:</span>
                    <input placeholder="COMMS_ADDRESS" type="email" name="email" autoComplete="email" required />
                  </label>
                </div>

                <label>
                  <span>&gt; SUBJECT:</span>
                  <select defaultValue="" name="subject" required>
                    <option value="" disabled hidden>
                      SELECT_SUBJECT
                    </option>
                    {contactSubjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>&gt; MESSAGE_DATA:</span>
                  <textarea placeholder="ENTER_DATA_PACKET..." rows={5} name="message" required />
                </label>

                {/* Honeypot field for anti-spam */}
                <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                {/* Status messages */}
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
                  {isLoading ? 'TRANSMITTING...' : 'INITIALIZE TRANSMISSION'}
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
                Direct Channel
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
                      <i className="material-symbols-outlined" aria-hidden="true">
                        {channel.icon}
                      </i>
                      {channel.label}
                    </span>
                    <i className="material-symbols-outlined" aria-hidden="true">
                      arrow_forward_ios
                    </i>
                  </a>
                ))}
              </div>
            </section>

            <section className="contact-node-panel tone-orange">
              <h3>
                <span aria-hidden="true" />
                External Nodes
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
                      <i className="material-symbols-outlined" aria-hidden="true">
                        {node.icon}
                      </i>
                      {node.label}
                    </span>
                    <i className="material-symbols-outlined" aria-hidden="true">
                      arrow_forward_ios
                    </i>
                  </a>
                ))}
              </div>
            </section>

            <section className="contact-node-panel tone-green">
              <h3>
                <span aria-hidden="true" />
                System Location
              </h3>
              <SystemLocationGlobe locationLabel={systemHud.locationLabel} fallbackImage={turinImage} />
            </section>

            <section className="contact-scanner" aria-label="System scanner">
              <div className="contact-scanner-track">
                <div className="contact-scanner-group">
                  <span>{systemHud.scanner}</span>
                  <span>{systemHud.scanner}</span>
                </div>
                <div className="contact-scanner-group" aria-hidden="true">
                  <span>{systemHud.scanner}</span>
                  <span>{systemHud.scanner}</span>
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

