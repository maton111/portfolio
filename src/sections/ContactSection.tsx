import {
  contactHeader,
  contactSubjectOptions,
  externalNodes,
  systemHud,
} from '../data/contactContent'
import './ContactSection.css'

function ContactSection() {
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

              <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
                <div className="contact-form-grid">
                  <label>
                    <span>&gt; NAME:</span>
                    <input placeholder="USER_IDENTIFIER" type="text" />
                  </label>

                  <label>
                    <span>&gt; EMAIL:</span>
                    <input placeholder="COMMS_ADDRESS" type="email" />
                  </label>
                </div>

                <label>
                  <span>&gt; SUBJECT:</span>
                  <select defaultValue={contactSubjectOptions[0]}>
                    {contactSubjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>&gt; MESSAGE_DATA:</span>
                  <textarea placeholder="ENTER_DATA_PACKET..." rows={5} />
                </label>

                <button type="submit">
                  INITIALIZE TRANSMISSION
                  <span className="material-symbols-outlined" aria-hidden="true">
                    sensors
                  </span>
                </button>
              </form>
            </div>
          </div>

          <aside className="contact-sidebar">
            <section className="contact-node-panel tone-orange">
              <h3>
                <span aria-hidden="true" />
                External Nodes
              </h3>
              <div>
                {externalNodes.map((node) => (
                  <a href={node.href} key={node.label}>
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
              <div className="location-map" aria-hidden="true">
                <div />
                <p>{systemHud.locationLabel}</p>
              </div>
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

