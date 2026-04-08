import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import GlitchTransition from '../components/overlays/GlitchTransition'
import './ProjectNotesPage.css'
import './EverydayLifeProjectPage.css'

// ─── Data ───────────────────────────────────────────────────────────────────

type ModuleStatus = 'done' | 'partial' | 'pending'

type Module = {
  name: string
  desc: string
  backendStatus: ModuleStatus
  mobileStatus: ModuleStatus
  highlight?: string
}

const modules: Module[] = [
  {
    name: 'Auth & Profilo',
    desc: 'Registrazione, login email/Google, verifica email, reset password, profilo con avatar e username.',
    backendStatus: 'done',
    mobileStatus: 'done',
  },
  {
    name: 'Gruppi',
    desc: 'CRUD gruppi con ruoli gerarchici (Owner/Admin/Member/Guest), invite QR, join request con approvazione.',
    backendStatus: 'done',
    mobileStatus: 'done',
    highlight: 'Join via deep link + QR code',
  },
  {
    name: 'Task Management',
    desc: 'Task e liste con priorità, scadenze, assegnazioni multi-membro e ricorrenze avanzate (JSON config).',
    backendStatus: 'done',
    mobileStatus: 'done',
    highlight: 'Ricorrenze full_custom con JSON config',
  },
  {
    name: 'Liste della Spesa',
    desc: 'Liste condivise con categorie (settori), articoli con quantità/unità, spunta real-time, ordine personalizzato.',
    backendStatus: 'done',
    mobileStatus: 'partial',
  },
  {
    name: 'Spese Condivise',
    desc: 'Registrazione spese, split automatico equo, tracciamento rimborsi, bilanci chi-deve-a-chi.',
    backendStatus: 'done',
    mobileStatus: 'pending',
    highlight: 'Split logic + bilanci backend pronti',
  },
  {
    name: 'Sistema Amicizie',
    desc: 'Ricerca per email/username, richieste pending, accept/reject, blocco utenti, stati completi.',
    backendStatus: 'done',
    mobileStatus: 'done',
  },
  {
    name: 'Notifiche',
    desc: 'Push FCM multi-canale, in-app inbox (7 giorni), deduplication, delivery tracking, tap routing.',
    backendStatus: 'done',
    mobileStatus: 'done',
    highlight: 'Deduplication + delivery tracking',
  },
  {
    name: 'Presenza Real-Time',
    desc: 'WebSocket persistente con scoped subscriptions (globale/gruppo/amici), snapshot + delta, reconnect automatico.',
    backendStatus: 'done',
    mobileStatus: 'done',
    highlight: 'Scoped subscriptions + backoff esponenziale',
  },
  {
    name: 'Parcheggio',
    desc: 'Salvataggio GPS ad alta precisione, visualizzazione mappa OSM/MapLibre, storico parcheggi.',
    backendStatus: 'done',
    mobileStatus: 'done',
  },
  {
    name: 'Timer',
    desc: 'Timer personali con nome, tipo, durata, tracking start/end. Utile per lavatrici, farmaci, forno.',
    backendStatus: 'done',
    mobileStatus: 'pending',
  },
  {
    name: 'Update System (OTA)',
    desc: 'Check versione all\'avvio, download APK dal backend, validazione SHA256, install in-app. Supporto CRITICAL/FORCE.',
    backendStatus: 'done',
    mobileStatus: 'done',
    highlight: 'SHA256 checksum + GitHub Releases',
  },
]

type BacklogItem = {
  label: string
  priority: 'high' | 'medium' | 'low'
}

const backlog: BacklogItem[] = [
  { label: 'UI Spese Condivise — schermata creazione, lista, bilanci', priority: 'high' },
  { label: 'UI Timer — creazione timer e notifica alla scadenza', priority: 'high' },
  { label: 'Background Jobs (Hangfire) — notifiche scheduled per scadenze task', priority: 'high' },
  { label: 'Widget homescreen completo — nuovo task, parcheggio, contatore oggi', priority: 'high' },
  { label: 'Rifinire Shopping UI — UX lista della spesa', priority: 'high' },
  { label: 'Chat di Gruppo — messaggistica semplice intra-gruppo', priority: 'medium' },
  { label: 'Habit Tracking — abitudini giornaliere con streak', priority: 'medium' },
  { label: 'Promemoria Bollette/Abbonamenti — scadenze ricorrenti con alert', priority: 'medium' },
  { label: 'Profilo esteso — avatar upload, bio, statistiche personali', priority: 'medium' },
  { label: 'iOS Support — configurazione Firebase iOS production', priority: 'low' },
  { label: 'Redis Cache — presence directory e notifiche ad alto volume', priority: 'low' },
  { label: 'Web App React — frontend browser (previsto in roadmap)', priority: 'low' },
  { label: 'Analytics & Insights — task completati, spese mensili, statistiche', priority: 'low' },
]

const backendStack = [
  'ASP.NET Core 8', 'Entity Framework Core 8', 'PostgreSQL 16', 'Npgsql',
  'Firebase Admin SDK', 'AutoMapper', 'FluentValidation', 'Serilog',
  'OpenTelemetry / Prometheus', 'MailKit / Gmail SMTP', 'Asp.Versioning', 'Docker',
]

const mobileStack = [
  'Flutter 3.10+', 'Dart 3.10+', 'flutter_riverpod', 'dio', 'firebase_auth',
  'firebase_messaging (FCM)', 'google_sign_in', 'web_socket_channel',
  'flutter_secure_storage (AES-GCM)', 'geolocator', 'flutter_map + maplibre_gl',
  'flutter_local_notifications', 'qr_flutter', 'app_links (deep links)',
  'open_filex (APK install)', 'lottie', 'skeletonizer',
]

// ─── Component ───────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: ModuleStatus }) {
  const map: Record<ModuleStatus, { label: string; cls: string }> = {
    done:    { label: 'Completo',  cls: 'edlc-dot edlc-dot--done' },
    partial: { label: 'Parziale', cls: 'edlc-dot edlc-dot--partial' },
    pending: { label: 'Da fare',  cls: 'edlc-dot edlc-dot--pending' },
  }
  const { label, cls } = map[status]
  return <span className={cls} title={label} aria-label={label} />
}

function EverydayLifeProjectPage() {
  const navigate = useNavigate()
  const [isLeaving, setIsLeaving] = useState(false)

  const navigateWithGlitch = (target: string) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      navigate(target)
      return
    }
    setIsLeaving(true)
    window.setTimeout(() => navigate(target), 180)
  }

  const doneCount    = modules.filter(m => m.backendStatus === 'done' && m.mobileStatus === 'done').length
  const partialCount = modules.filter(m => m.backendStatus !== 'done' || m.mobileStatus !== 'done').length

  return (
    <main className="project-notes-page terminal-bg" aria-labelledby="edlc-title">
      <section className="project-notes-shell">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <header className="project-notes-hero">
          <div className="project-notes-hero-copy">
            <small>ELC-CORE-03 // Product · In sviluppo attivo</small>
            <h1 id="edlc-title">Everyday Life Core</h1>
            <p>
              Backend ASP.NET Core 8 + app Flutter per la gestione collaborativa della vita quotidiana.
              Task, spese condivise, liste, notifiche push, presenza real-time e molto altro —
              tutto su infrastruttura self-hosted.
            </p>
            <div className="project-notes-hero-meta">
              <span>Role: Full Stack Developer (Solo)</span>
              <span>Stack focus: .NET · Flutter · PostgreSQL · WebSocket</span>
              <span>Status: In sviluppo attivo</span>
            </div>
            <div className="project-notes-actions">
              <button type="button" onClick={() => navigateWithGlitch('/#projects')}>
                Back to Projects
              </button>
              <button className="primary" type="button" onClick={() => navigateWithGlitch('/#contact')}>
                Contact
              </button>
            </div>
          </div>

          {/* Hero visual: live stats */}
          <div className="project-notes-hero-visual edlc-hero-visual" aria-hidden="true">
            <div className="edlc-hero-stat">
              <span className="edlc-hero-stat-number">{modules.length}</span>
              <span className="edlc-hero-stat-label">Moduli Funzionali</span>
            </div>
            <div className="edlc-hero-stat">
              <span className="edlc-hero-stat-number edlc-stat-green">{doneCount}</span>
              <span className="edlc-hero-stat-label">Completi end-to-end</span>
            </div>
            <div className="edlc-hero-stat">
              <span className="edlc-hero-stat-number edlc-stat-orange">{partialCount}</span>
              <span className="edlc-hero-stat-label">In sviluppo / Da fare</span>
            </div>
            <div className="edlc-hero-divider" />
            <div className="edlc-hero-infra">
              <span className="edlc-infra-label">INFRA</span>
              <span>VPS Ubuntu· Cloudflare Tunnel</span>
              <span>everydaylifecore.com</span>
            </div>
          </div>
        </header>

        {/* ── CONTEXT + CHALLENGE ──────────────────────────────── */}
        <section className="project-notes-grid" aria-label="Overview">
          <article className="project-notes-panel">
            <h2>Context</h2>
            <p>
              Progetto personale nato da un'esigenza concreta: coordinare vita domestica con coinquilini
              senza affidarsi ad app generiche frammentate. Il target primario è un gruppo di 4 persone
              (1 sviluppatore + 3 coinquilini), ma il sistema è progettato per qualsiasi gruppo che
              condivide spazi o responsabilità.
            </p>
            <p>
              Backend in produzione su VPS Ubuntu con Cloudflare Tunnel, app Android in uso attivo.
              Il progetto è trattato come un prodotto reale con attenzione a qualità del codice,
              sicurezza e scalabilità futura.
            </p>
          </article>

          <article className="project-notes-panel">
            <h2>Challenge</h2>
            <p>
              Costruire un sistema collaborativo completo — da solo — bilanciando scope, qualità e velocità
              di delivery. Le sfide tecniche principali:
            </p>
            <ul>
              <li>Real-time presence con scoped subscriptions senza degradare le performance</li>
              <li>Task ricorrenti con configurazione avanzata (JSON config full_custom)</li>
              <li>Sistema notifiche multi-canale con deduplication e delivery tracking</li>
              <li>OTA update con validazione SHA256 e installazione in-app su Android</li>
              <li>Hosting affidabile con infrastruttura a costi minimi (VPS Ubuntu)</li>
            </ul>
          </article>
        </section>

        {/* ── ARCHITECTURE ─────────────────────────────────────── */}
        <article className="project-notes-panel edlc-arch-panel">
          <h2>Architettura di Sistema</h2>
          <div className="edlc-arch-grid">
            <div className="edlc-arch-col">
              <h3 className="edlc-arch-col-title">Client Layer</h3>
              <div className="edlc-arch-node edlc-arch-node--primary">
                Flutter Mobile
                <span>Android (prod) · iOS (futuro)</span>
              </div>
              <div className="edlc-arch-node edlc-arch-node--future">
                Web App React
                <span>In roadmap</span>
              </div>
            </div>

            <div className="edlc-arch-arrow">
              <span>HTTPS / WSS</span>
              <span className="edlc-arch-arrow-line">→</span>
              <span>Cloudflare Tunnel</span>
            </div>

            <div className="edlc-arch-col">
              <h3 className="edlc-arch-col-title">Backend (VPS Ubuntu)</h3>
              <div className="edlc-arch-node edlc-arch-node--primary">
                ASP.NET Core 8
                <span>REST API · WebSocket Presence · Health · Metrics</span>
              </div>
              <div className="edlc-arch-node">
                PostgreSQL 16
                <span>Docker containerizzato</span>
              </div>
            </div>

            <div className="edlc-arch-arrow">
              <span>SDK / API</span>
              <span className="edlc-arch-arrow-line">→</span>
              <span>Servizi esterni</span>
            </div>

            <div className="edlc-arch-col">
              <h3 className="edlc-arch-col-title">Servizi Esterni</h3>
              <div className="edlc-arch-node">
                Firebase Auth + FCM
                <span>Autenticazione · Push Notifications</span>
              </div>
              <div className="edlc-arch-node">
                Gmail SMTP
                <span>Email transazionali</span>
              </div>
              <div className="edlc-arch-node">
                GitHub API
                <span>Releases APK per OTA update</span>
              </div>
            </div>
          </div>
        </article>

        {/* ── MODULES GRID ─────────────────────────────────────── */}
        <section aria-label="Moduli funzionali">
          <div className="edlc-section-header">
            <h2 className="edlc-section-title">Moduli Funzionali</h2>
            <div className="edlc-legend">
              <span><span className="edlc-dot edlc-dot--done" /> Completo</span>
              <span><span className="edlc-dot edlc-dot--partial" /> Parziale</span>
              <span><span className="edlc-dot edlc-dot--pending" /> Da fare</span>
            </div>
          </div>

          <div className="edlc-modules-grid">
            {modules.map((mod) => (
              <article key={mod.name} className="edlc-module-card">
                <header className="edlc-module-header">
                  <span className="edlc-module-name">{mod.name}</span>
                  <span className="edlc-module-status-pair" aria-label="stato backend / mobile">
                    <StatusDot status={mod.backendStatus} />
                    <StatusDot status={mod.mobileStatus} />
                  </span>
                </header>
                <p className="edlc-module-desc">{mod.desc}</p>
                {mod.highlight ? (
                  <span className="edlc-module-highlight">{mod.highlight}</span>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* ── IMPLEMENTATION STATUS TABLES ─────────────────────── */}
        <section className="project-notes-grid" aria-label="Stato implementazione">
          <article className="project-notes-panel">
            <h2>Backend — Stato</h2>
            <div className="edlc-status-list">
              {[
                ['Autenticazione Firebase + sync utente', 'done'],
                ['Gestione Utenti (CRUD profilo, verifica email)', 'done'],
                ['Gruppi (CRUD + membri + ruoli + invite)', 'done'],
                ['Task Management (ricorrenze avanzate)', 'done'],
                ['Liste della Spesa (categorie, ordine custom)', 'done'],
                ['Spese Condivise (split + bilanci)', 'done'],
                ['Sistema Amicizie (blocco, stati completi)', 'done'],
                ['Notifiche (DB + FCM + deduplication)', 'done'],
                ['Presenza Real-Time (WebSocket scoped)', 'done'],
                ['Parcheggio (GPS + storico)', 'done'],
                ['Timer (struttura base)', 'done'],
                ['GitHub Releases Integration (OTA)', 'done'],
                ['JWT / Refresh Token', 'partial'],
                ['Background Jobs (Hangfire)', 'pending'],
                ['Habit Tracking', 'pending'],
                ['Chat di Gruppo', 'pending'],
              ].map(([label, status]) => (
                <div key={label} className="edlc-status-row">
                  <StatusDot status={status as ModuleStatus} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="project-notes-panel">
            <h2>Mobile (Flutter) — Stato</h2>
            <div className="edlc-status-list">
              {[
                ['Autenticazione (email + Google, verifica)', 'done'],
                ['Profilo Utente (vista + modifica username)', 'done'],
                ['Gruppi (CRUD completo, join requests)', 'done'],
                ['Task Management (oggi, liste, drag-drop)', 'done'],
                ['Liste della Spesa (UI base)', 'partial'],
                ['Spese Condivise (UI)', 'pending'],
                ['Sistema Amicizie (search, richieste, blocco)', 'done'],
                ['Notifiche FCM + routing', 'done'],
                ['Notifiche inbox in-app', 'done'],
                ['Presenza Real-Time (badge avatar)', 'done'],
                ['Parcheggio (mappa OSM + MapLibre)', 'done'],
                ['Timer (UI)', 'pending'],
                ['Aggiornamento App OTA (SHA256 + install)', 'done'],
                ['Temi (6 temi + dark mode)', 'done'],
                ['Localizzazione IT + EN', 'done'],
                ['Deep Links (join gruppo + cold start)', 'done'],
                ['Widget Homescreen', 'partial'],
                ['Chat di Gruppo', 'pending'],
              ].map(([label, status]) => (
                <div key={label} className="edlc-status-row">
                  <StatusDot status={status as ModuleStatus} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* ── ENGINEERING DECISIONS ────────────────────────────── */}
        <section className="project-notes-sections" aria-label="Decisioni ingegneristiche">
          <article className="project-notes-panel">
            <h2>Infrastruttura Self-Hosted</h2>
            <ul>
              <li>Backend su VPS Ubuntu con Cloudflare Tunnel per HTTPS pubblico a costo zero.</li>
              <li>PostgreSQL in container Docker: isolamento, portabilità, backup semplificato.</li>
              <li>Nessun cloud provider per il backend: controllo totale su dati e deploy.</li>
              <li>Nginx come reverse proxy con gestione header e rate limiting.</li>
            </ul>
          </article>

          <article className="project-notes-panel">
            <h2>Real-Time Presence</h2>
            <ul>
              <li>WebSocket persistente autenticato via token Firebase.</li>
              <li>Scoped subscriptions: ogni client si sottoscrive solo ai contesti rilevanti (globale/gruppo/amici/lista utenti).</li>
              <li>Snapshot iniziale + delta updates per minimizzare payload.</li>
              <li>Reconnect automatico con backoff esponenziale in caso di disconnessione.</li>
              <li>Stato presenza sincronizzato al lifecycle dell'app (foreground/background/terminate).</li>
            </ul>
          </article>

          <article className="project-notes-panel">
            <h2>Task Ricorrenti</h2>
            <ul>
              <li>Ricorrenze semplici: giornaliera, settimanale, mensile, annuale — configurazione UI.</li>
              <li>Ricorrenze avanzate (full_custom): configurazione JSON arbitraria per pattern complessi.</li>
              <li>Backend calcola le occorrenze future al salvataggio del task.</li>
              <li>Alla scadenza di un'occorrenza, la successiva viene automaticamente generata.</li>
              <li>Notifica push automatica agli assegnatari ad ogni cambio stato ricorrente.</li>
            </ul>
          </article>

          <article className="project-notes-panel">
            <h2>OTA Update System</h2>
            <ul>
              <li>Backend restituisce le ultime versioni per le release GitHub: serve l'APK tramite Claudflare con checksum SHA256.</li>
              <li>App verifica il checksum locale prima di avviare l'installazione.</li>
              <li>Supporto per update critici (CRITICAL) con dialog obbligatorio e forzati (FORCE UPDATE).</li>
              <li>Progress bar durante il download con gestione errori e retry.</li>
              <li>Admin backend può creare release GitHub via endpoint autenticato.</li>
            </ul>
          </article>

          <article className="project-notes-panel">
            <h2>State Management (Riverpod)</h2>
            <ul>
              <li>flutter_riverpod per state management dichiarativo e testabile.</li>
              <li>Provider separati per ogni dominio (auth, gruppi, task, notifiche, presence).</li>
              <li>AsyncNotifierProvider per stati asincroni con loading/error/data granulare.</li>
              <li>flutter_secure_storage con AES-GCM per token e preferenze sensibili.</li>
            </ul>
          </article>

          <article className="project-notes-panel">
            <h2>Sicurezza e Autenticazione</h2>
            <ul>
              <li>Firebase Authentication per gestione token: eliminazione complessità auth custom.</li>
              <li>Backend valida ogni richiesta tramite Firebase Admin SDK (verifica ID token).</li>
              <li>Sincronizzazione utente al primo login: backend crea profilo e liste default.</li>
              <li>Ruoli gerarchici a livello gruppo verificati lato backend su ogni endpoint sensibile.</li>
              <li>Deep link con codice invite validato server-side per prevenire join non autorizzati.</li>
            </ul>
          </article>
        </section>

        {/* ── STACK ─────────────────────────────────────────────── */}
        <section className="project-notes-grid" aria-label="Stack tecnologico">
          <article className="project-notes-panel">
            <h2>Stack Backend</h2>
            <div className="project-notes-tags">
              {backendStack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <article className="project-notes-panel">
            <h2>Stack Mobile</h2>
            <div className="project-notes-tags">
              {mobileStack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </section>

        {/* ── ROADMAP + OUTCOMES ───────────────────────────────── */}
        <section className="project-notes-grid" aria-label="Roadmap e risultati">
          <article className="project-notes-panel">
            <h2>Roadmap — Backlog Prioritizzato</h2>
            <div className="edlc-backlog">
              {backlog.map((item) => (
                <div key={item.label} className={`edlc-backlog-item edlc-backlog-item--${item.priority}`}>
                  <span className="edlc-backlog-dot" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="edlc-backlog-legend">
              <span className="edlc-backlog-item--high">● Alta priorità</span>
              <span className="edlc-backlog-item--medium">● Media priorità</span>
              <span className="edlc-backlog-item--low">● Bassa priorità</span>
            </div>
          </article>

          <article className="project-notes-panel">
            <h2>Outcomes</h2>
            <ul>
              <li>Backend in produzione su infrastruttura self-hosted stabile, in uso quotidiano.</li>
              <li>App Android funzionante end-to-end per il gruppo primario di 4 persone.</li>
              <li>Sistema real-time (WebSocket presence) completamente operativo senza dipendenze cloud aggiuntive.</li>
              <li>OTA update system: aggiornamenti distribuiti direttamente dall'app, senza store.</li>
              <li>11 moduli funzionali di cui 7 completamente implementati backend + mobile.</li>
              <li>Architettura scalabile verso iOS, Web App e feature aggiuntive senza refactoring strutturale.</li>
            </ul>

            <h2 style={{ marginTop: '20px' }}>Cosa ho imparato</h2>
            <ul>
              <li>Progettare sistemi real-time con WebSocket in ASP.NET Core con gestione stato distribuita.</li>
              <li>Self-hosting production-grade su hardware limitato con Cloudflare Tunnel.</li>
              <li>Sviluppo mobile Flutter con Riverpod: state management reattivo su domini complessi.</li>
              <li>Bilanciare scope e qualità da solo: quando iterare veloce e quando investire in robustezza.</li>
            </ul>
          </article>
        </section>

      </section>

      {isLeaving ? <GlitchTransition /> : null}
    </main>
  )
}

export default EverydayLifeProjectPage
