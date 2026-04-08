# Everyday Life Core — Documentazione Completa del Progetto

> **Versione documento**: 1.0  
> **Data**: Aprile 2026  
> **Stato**: In sviluppo attivo  
> **Autore**: Generato da analisi codebase (Backend + Mobile)

---

# INDICE

## Parte 1 — Funzionamento e Struttura
1. [Panoramica del Progetto](#1-panoramica-del-progetto)
2. [Visione e Obiettivi](#2-visione-e-obiettivi)
3. [Utenti e Contesti d'Uso](#3-utenti-e-contesti-duso)
4. [Moduli Funzionali](#4-moduli-funzionali)
5. [Flussi Utente Principali](#5-flussi-utente-principali)
6. [Stato Attuale — Cosa c'è e Cosa Manca](#6-stato-attuale--cosa-cè-e-cosa-manca)
7. [Roadmap e Sviluppi Futuri](#7-roadmap-e-sviluppi-futuri)

## Parte 2 — Stack Tecnico e Sistemi Interni
8. [Architettura Generale](#8-architettura-generale)
9. [Stack Tecnologico](#9-stack-tecnologico)
10. [Backend — Struttura e Architettura](#10-backend--struttura-e-architettura)
11. [Mobile — Struttura e Architettura](#11-mobile--struttura-e-architettura)
12. [Database — Schema Completo](#12-database--schema-completo)
13. [API — Endpoint Completi](#13-api--endpoint-completi)
14. [Sistema di Autenticazione e Sicurezza](#14-sistema-di-autenticazione-e-sicurezza)
15. [Real-Time — WebSocket Presence](#15-real-time--websocket-presence)
16. [Sistema Notifiche](#16-sistema-notifiche)
17. [Sistema di Aggiornamento App](#17-sistema-di-aggiornamento-app)
18. [Infrastruttura e Deployment](#18-infrastruttura-e-deployment)
19. [Testing](#19-testing)
20. [Logging e Monitoring](#20-logging-e-monitoring)

---

---

# PARTE 1 — FUNZIONAMENTO E STRUTTURA

---

## 1. Panoramica del Progetto

**Everyday Life Core** è un'applicazione mobile cross-platform per la gestione collaborativa della vita quotidiana. Permette a gruppi di persone (coinquilini, famiglie, amici, team) di coordinare task, spese condivise, liste della spesa e molto altro in modo semplice e in tempo reale.

Il sistema è composto da:

| Componente | Tecnologia | Stato |
|---|---|---|
| **Backend API** | ASP.NET Core 8 | In produzione (sviluppo attivo) |
| **App Mobile** | Flutter 3.10+ | In sviluppo attivo (Android first) |
| **Database** | PostgreSQL 16 | In produzione |
| **Autenticazione** | Firebase Authentication | Attivo |

L'app è pensata principalmente per **Android**, con supporto futuro per iOS. Il backend gira su infrastruttura self-hosted (Raspberry Pi + Cloudflare Tunnel).

---

## 2. Visione e Obiettivi

### Visione
Un'app che semplifica la vita quotidiana con focus su:
- **Semplicità**: UI pulita e minimale, azioni rapide
- **Collaborazione**: task condivisi, spese, liste in gruppo
- **Velocità**: widget homescreen, shortcuts, notifiche smart
- **Intelligenza**: notifiche prioritizzate, promemoria automatici

### Obiettivi Primari
1. Eliminare le dimenticanze (lavatrici, medicine, bollette, pulizie)
2. Gestire spese condivise con bilanci chiari tra coinquilini
3. Coordinare turni e responsabilità domestiche
4. Tracciare abitudini e salute personale
5. Ridurre lo stress da promemoria quotidiani

### Target Primario
- Gruppo principale: **1 sviluppatore + 3 coinquilini**
- Target esteso: qualsiasi gruppo di persone che condivide spazi o responsabilità

---

## 3. Utenti e Contesti d'Uso

### Ruoli nel Sistema

**A livello di sistema:**
- `User` — utente standard registrato
- `Admin` — ruolo di sistema (accesso a endpoint amministrativi come la creazione di release GitHub)

**A livello di gruppo:**
| Ruolo | Permessi |
|---|---|
| `Owner` | Elimina il gruppo, gestisce tutti i membri, tutte le azioni admin |
| `Admin` | Gestisce membri, accetta/rifiuta richieste join, modifica gruppo |
| `Member` | Crea task/spese/liste, gestisce i propri contenuti |
| `Guest` | Visualizza e partecipa in modo limitato |

### Contesti d'Uso

**Uso Personale** — task list private, shopping list personali, timer, parcheggio

**Uso di Gruppo** — task condivisi con assegnazioni, spese suddivise automaticamente, liste della spesa condivise, notifiche ai membri

**Uso Sociale** — sistema amicizie per trovare persone, invitarle nei gruppi, vedere la loro presenza online

---

## 4. Moduli Funzionali

### 4.1 Autenticazione e Profilo Utente

Gestisce la registrazione, login, verifica email e gestione profilo.

**Cosa fa:**
- Registrazione con email/password o Google Sign-In
- Login con email/password o Google
- Verifica email tramite token inviato via email
- Reset password via email con token one-time
- Profilo con nome, cognome, username, avatar, data di nascita
- Aggiornamento username
- Visualizzazione profilo di altri utenti

**Stato:** Completamente implementato ✅

---

### 4.2 Gruppi

Il cuore del sistema collaborativo. Ogni gruppo è un contesto condiviso con i suoi membri, i suoi task, le sue spese e le sue liste.

**Cosa fa:**
- Creazione gruppi con nome, descrizione, colore, categoria, avatar
- Invito membri tramite email o username
- Codice invite QR per join rapido
- Richieste di accesso (join request) con approvazione admin
- Gestione ruoli dei membri (Owner, Admin, Member, Guest)
- Rimozione membri, uscita dal gruppo
- Eliminazione gruppo (solo Owner)
- Ordine personalizzato dei gruppi nell'interfaccia
- Categorie gruppo: lavoro, famiglia, amici, progetto, altro

**Stato:** Completamente implementato ✅

---

### 4.3 Task Management

Sistema completo di gestione attività, sia personali che di gruppo.

**Cosa fa:**
- Creazione task con titolo, descrizione, categoria, priorità, scadenza
- Liste task (TaskList) come contenitori organizzativi
- Task in liste personali o di gruppo
- Assegnazione task a uno o più membri del gruppo
- Stato task: `ToDo → InProgress → Done` (con `Overdue`, `Archived`)
- Priorità: Critical, High, Medium, Low
- Task ripetibili con ricorrenza: giornaliera, settimanale, mensile, annuale, personalizzata
- Configurazione ricorrenza avanzata (full_custom con JSON config)
- Notifica al gruppo quando viene eseguita un'azione su un task
- Vista "Oggi" per task in scadenza oggi
- Riordino drag-drop dei task e delle liste
- Ordine personalizzato delle liste

**Stato:** Completamente implementato ✅ (ricorrenze avanzate implementate di recente)

---

### 4.4 Liste della Spesa

Sistema per gestire liste della spesa condivise con categorie.

**Cosa fa:**
- Creazione liste della spesa (personali o di gruppo)
- Categorie (settori) per organizzare gli articoli (es. Frutta, Carne, Latticini)
- Aggiunta articoli con nome, quantità, unità, nota
- Assegnazione articoli a membri specifici
- Toggle "spuntato/non spuntato" per ogni articolo
- Ordine personalizzato delle categorie per utente
- Colore e descrizione per ogni lista

**Stato:** Implementato ✅ — UI mobile ancora in affinamento

---

### 4.5 Spese Condivise

Sistema per tracciare spese di gruppo e calcolare i bilanci tra i membri.

**Cosa fa:**
- Registrazione spese con titolo, importo, categoria, data, note
- Pagamento registrato da un singolo membro ("ha pagato X per tutti")
- Suddivisione automatica equa tra tutti i membri del gruppo
- Tracciamento pagamenti individuali (chi ha già rimborsato e chi no)
- Calcolo bilanci: chi deve quanto a chi
- Eliminazione spese (solo chi le ha create)

**Categorie spese supportate:** Cibo, Trasporti, Affitto, Utenze, Intrattenimento, Salute, Altro

**Stato:** Backend completamente implementato ✅ — UI mobile da sviluppare/completare ⚠️

---

### 4.6 Sistema Amicizie

Sistema social per connettere utenti al di fuori dei gruppi.

**Cosa fa:**
- Ricerca utenti per email o username
- Invio/ricezione richieste di amicizia
- Accettazione/rifiuto richieste
- Lista amici accettati
- Rimozione amicizie
- Blocco/sblocco utenti
- Visualizzazione richieste in entrata e in uscita

**Stati amicizia:** Pending, Accepted, Rejected, Blocked, Removed

**Stato:** Backend completamente implementato ✅ — UI mobile implementata ✅

---

### 4.7 Notifiche

Sistema di notifiche multi-canale per tenere gli utenti aggiornati.

**Cosa fa:**
- Notifiche in-app per eventi di gruppo e task
- Push notification via Firebase Cloud Messaging (FCM)
- Notifiche locali quando l'app è in foreground
- Storico notifiche (ultimi 7 giorni)
- Segna come letta (singola o batch)
- Eliminazione notifiche
- Routing automatico al contesto corretto al tap
- Deduplicazione per evitare notifiche duplicate
- Tracciamento delivery (tentativi, stato)

**Tipi di notifiche:** Task assegnato, Task scaduto, Membro aggiunto al gruppo, Aggiornamento gruppo, Generale

**Stato:** Backend completamente implementato ✅ — Mobile FCM + routing implementato ✅

---

### 4.8 Parcheggio

Mini-modulo per salvare la posizione dell'auto.

**Cosa fa:**
- Salvataggio coordinate GPS con alta precisione
- Label, nota e piano del parcheggio
- Indirizzo automatico
- Visualizzazione su mappa (flutter_map / MapLibre GL)
- Cronologia dei parcheggi precedenti
- Attivazione/disattivazione parcheggio attivo

**Stato:** Backend implementato ✅ — Mobile implementato ✅ (doppia implementazione mappa: flutter_map + maplibre)

---

### 4.9 Timer

Sistema per timer personali (lavatrici, forno, farmaci, ecc.).

**Cosa fa:**
- Creazione timer con nome, tipo, durata
- Tracking start/end time
- Stato attivo/completato
- Tipi di timer configurabili

**Stato:** Backend implementato ✅ — UI mobile non ancora implementata ⚠️

---

### 4.10 Presenza Real-Time (Presence)

Sistema WebSocket per vedere chi è online in tempo reale.

**Cosa fa:**
- Connessione WebSocket persistente autenticata
- Aggiornamento automatico stato (online/offline) al cambio lifecycle app
- Sottoscrizione a scope: globale, per gruppo, per amici, per lista utenti
- Badge di presenza sugli avatar (verde = online, grigio = offline, ecc.)
- Snapshot iniziale + delta updates per efficienza
- Reconnect automatico con backoff esponenziale

**Stato:** Completamente implementato ✅ (sistema molto sofisticato)

---

### 4.11 Aggiornamento App (Update System)

Sistema in-app per aggiornare l'APK direttamente dall'app.

**Cosa fa:**
- Check automatico nuova versione all'avvio
- Scarica APK dal backend (che lo serve dalla release GitHub)
- Validazione checksum SHA256 per sicurezza
- Installazione APK in-app (Android)
- Supporto per aggiornamenti critici ("CRITICAL") e forzati ("FORCE UPDATE")
- Progress bar durante il download

**Stato:** Completamente implementato ✅

---

## 5. Flussi Utente Principali

### 5.1 Registrazione e Onboarding

```
1. Apertura app → Login Page
2. Tap "Registrati"
3. Inserimento: email, password, nome, cognome, username, data di nascita
4. Firebase crea account
5. Backend sincronizza utente (crea profilo + liste default)
6. Invio email di verifica
7. Redirect a EmailVerificationPage
8. Utente verifica email dal link
9. Accesso completo all'app → HomePage
```

### 5.2 Login Esistente

```
1. Apertura app
2. Inserimento email + password (o Google Sign-In)
3. Firebase autentica
4. App carica profilo utente + provider Riverpod
5. Bootstrap sessione: FCM token registrato, amici caricati
6. HomePage
```

### 5.3 Creazione e Gestione Gruppo

```
1. FAB in GroupsPage → "Nuovo Gruppo"
2. Inserimento nome, descrizione, colore, categoria
3. Backend crea gruppo, utente diventa Owner
4. Aggiunta membri: ricerca per email/username
5. Condivisione invite code QR per join rapido
6. I membri invitati ricevono notifica
7. Gestione ruoli dal dettaglio gruppo
```

### 5.4 Task di Gruppo con Ricorrenza

```
1. Apri modulo Tasks → seleziona lista di gruppo
2. "+" → inserisci titolo, descrizione, priorità, data scadenza
3. Abilita "Ripetibile" → seleziona tipo: settimanale (es. ogni lunedì)
4. Assegna a uno o più membri del gruppo
5. Backend calcola occorrenze, salva config JSON
6. Gli assegnatari ricevono notifica push
7. Alla scadenza: notifica automatica "task in scadenza"
8. Membro completa task → stato cambia a Done
9. Il giorno successivo: task riparte da ToDo (ricorrenza)
```

### 5.5 Spesa Condivisa

```
1. Apri modulo Expenses nel gruppo
2. "+" → inserisci titolo, importo, categoria, data, note
3. Backend divide equamente tra tutti i membri
4. Ogni membro vede la propria quota
5. Chi ha pagato può segnare le quote come "paid"
6. Sezione Bilanci mostra chi deve a chi e quanto
```

### 5.6 Lista della Spesa Condivisa

```
1. Apri modulo Shopping → seleziona lista di gruppo
2. Aggiungi items con nome, quantità, unità
3. Organizza per categorie (es. Frutta, Pulizia)
4. Al supermercato: spunta gli articoli man mano
5. Tutti i membri vedono in tempo reale gli aggiornamenti
```

### 5.7 Salvare il Parcheggio

```
1. Widget homescreen "Salva Parcheggio" OPPURE
2. Apri app → modulo Parking
3. GPS acquisisce coordinate attuali
4. Opzionale: aggiungi label, nota, piano
5. Visualizza sulla mappa la posizione salvata
6. Al ritorno: apri mappa → naviga verso l'auto
```

### 5.8 Deep Link per Join Gruppo

```
1. Utente A condivide link: everydaylifecore://open/groups/join?code=XXXX&groupId=123
2. Utente B tocca il link (anche senza app aperta)
3. App si apre (o viene aperta)
4. Se non autenticato: link viene salvato come "pending"
5. Dopo login: link viene consumato automaticamente
6. Backend valida il codice invite → aggiunge al gruppo
7. SnackBar di conferma → redirect al gruppo
```

---

## 6. Stato Attuale — Cosa c'è e Cosa Manca

### Legenda
- ✅ Implementato e funzionante
- ⚠️ Implementato parzialmente o da rifinire
- ❌ Non ancora implementato

### Backend

| Funzionalità | Stato | Note |
|---|---|---|
| Autenticazione Firebase | ✅ | Completo con sync utente |
| Gestione Utenti (CRUD profilo) | ✅ | Incluso verifica email, reset pw |
| Gruppi (CRUD + membri + ruoli) | ✅ | Incluso invite code, join requests |
| Task Management | ✅ | Incluso ricorrenze avanzate |
| Liste della Spesa | ✅ | Incluso categorie e ordine personalizzato |
| Spese Condivise | ✅ | Incluso split automatico e bilanci |
| Sistema Amicizie | ✅ | Incluso blocco, stati completi |
| Notifiche (DB + FCM) | ✅ | Incluso deduplication e delivery tracking |
| Presenza Real-Time (WebSocket) | ✅ | Scoped subscriptions complesse |
| Parcheggio | ✅ | GPS + storico |
| Timer | ✅ | Struttura base |
| GitHub Releases Integration | ✅ | Per update system |
| JWT / Refresh Token | ⚠️ | Infrastruttura presente, non usata attivamente |
| Background Jobs (Hangfire) | ❌ | Non implementato — notifiche scheduled assenti |
| Habit Tracking | ❌ | Non iniziato |
| Promemoria Bollette/Abbonamenti | ❌ | Non iniziato |
| Water Tracker | ❌ | Non iniziato |
| Chat di Gruppo | ❌ | Non iniziato |
| Ricerca Globale | ❌ | Non iniziato |

### Mobile (Flutter)

| Funzionalità | Stato | Note |
|---|---|---|
| Autenticazione (email + Google) | ✅ | Completo con verifica email |
| Profilo Utente | ✅ | Vista + modifica username |
| Gruppi (lista + dettaglio + gestione) | ✅ | CRUD completo, join requests |
| Task Management | ✅ | Vista oggi, per lista, drag-drop |
| Liste della Spesa | ⚠️ | Base implementata, UI da rifinire |
| Spese Condivise | ❌ | Backend pronto, UI non iniziata |
| Sistema Amicizie | ✅ | Search, richieste, blocco |
| Notifiche (FCM + routing) | ✅ | Foreground, background, tap routing |
| Notifiche (inbox in-app) | ✅ | Lista ultimi 7 giorni |
| Presenza Real-Time | ✅ | Badge presenza su avatar |
| Parcheggio | ✅ | Mappa OSM + MapLibre |
| Timer | ❌ | Backend pronto, UI non iniziata |
| Aggiornamento App (OTA) | ✅ | Download + SHA256 + install |
| Temi (6 temi + dark mode) | ✅ | Persiste in storage crittografato |
| Localizzazione (IT + EN) | ✅ | ARB files completi |
| Deep Links | ✅ | Join gruppo + cold start |
| Widget Homescreen | ⚠️ | Azioni definite, implementazione base |
| Habit Tracking | ❌ | Non iniziato |
| Chat di Gruppo | ❌ | Struttura providers presente, UI assente |
| Spese (UI) | ❌ | Da iniziare |
| Timer (UI) | ❌ | Da iniziare |

---

## 7. Roadmap e Sviluppi Futuri

### Priorità Alta (Breve Termine)
1. **UI Spese Condivise** — schermata creazione spesa, lista spese, bilanci
2. **UI Timer** — creazione timer, notifica alla scadenza
3. **Background Jobs** — notifiche scheduled per scadenze task (Hangfire)
4. **Rifinire Shopping UI** — migliorare UX lista della spesa
5. **Widget Homescreen completo** — salva parcheggio, nuovo task, contatore task oggi

### Priorità Media (Medio Termine)
6. **Chat di Gruppo** — messaggistica semplice intra-gruppo (struttura presente)
7. **Habit Tracking** — abitudini giornaliere con streak
8. **Promemoria Bollette/Abbonamenti** — scadenze ricorrenti con alert
9. **Migliora sistema ricorrenze** — UI per configurazione avanzata full_custom
10. **Profilo esteso** — avatar upload, bio, statistiche

### Priorità Bassa (Lungo Termine)
11. **iOS Support** — configurazione Firebase iOS prod
12. **Integrazioni Voice Assistant** — Google Assistant Actions
13. **Water Tracker** — tracciamento idratazione giornaliera
14. **Analytics & Insights** — statistiche personali (task completati, spese mensili)
15. **Redis Cache** — per presence directory e notifiche ad alto volume
16. **Web App** — React frontend (previsto in ROADMAP originale)

---

---

# PARTE 2 — STACK TECNICO E SISTEMI INTERNI

---

## 8. Architettura Generale

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│                                                          │
│  ┌─────────────────┐        ┌─────────────────────────┐  │
│  │  Flutter Mobile │        │   (Web App - futuro)    │  │
│  │  Android (prod) │        │   React + TypeScript    │  │
│  │  iOS (futuro)   │        │                         │  │
│  └────────┬────────┘        └────────────┬────────────┘  │
└───────────┼─────────────────────────────┼───────────────┘
            │ HTTPS / WSS                 │ HTTPS
            │                             │
┌───────────▼─────────────────────────────▼───────────────┐
│                   CLOUDFLARE TUNNEL                       │
│              (everydaylifecore.com)                       │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│               RASPBERRY PI (Self-Hosted)                  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │            ASP.NET Core 8 Web API                 │  │
│  │                                                   │  │
│  │  REST API (/api/v1/...)                           │  │
│  │  WebSocket (/presence)                            │  │
│  │  Health (/health)                                 │  │
│  │  Metrics (/metrics)                               │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │                                │
│  ┌──────────────────────▼────────────────────────────┐  │
│  │               PostgreSQL 16                        │  │
│  │           (Docker Container)                       │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
            │                       │
            ▼                       ▼
┌───────────────────┐   ┌─────────────────────────┐
│  Firebase Auth    │   │    Gmail SMTP            │
│  Firebase FCM     │   │  (Email transazionali)   │
└───────────────────┘   └─────────────────────────┘
            │
            ▼
┌───────────────────┐
│   GitHub API      │
│  (Releases APK)   │
└───────────────────┘
```

---

## 9. Stack Tecnologico

### Backend

| Tecnologia | Versione | Utilizzo |
|---|---|---|
| ASP.NET Core | 8.0 | Framework Web API |
| Entity Framework Core | 8.x | ORM per PostgreSQL |
| PostgreSQL | 16 | Database relazionale |
| Npgsql | 8.x | Driver EF per PostgreSQL |
| Firebase Admin SDK | 3.4.0 | Validazione token Firebase |
| AutoMapper | 16.1.1 | Mapping entità ↔ DTO |
| FluentValidation | 11.9.0 | Validazione DTO |
| BCrypt.Net-Next | 4.0.3 | Hashing password |
| Serilog | 8.0.0 | Structured logging |
| OpenTelemetry | Latest | Metrics (Prometheus) |
| MailKit / System.Net.Mail | — | Invio email SMTP |
| Asp.Versioning | — | API versioning URL |
| Docker | — | PostgreSQL containerizzato |

### Mobile (Flutter)

| Tecnologia | Versione | Utilizzo |
|---|---|---|
| Flutter | ^3.10.8 | Framework UI cross-platform |
| Dart | ^3.10.8 | Linguaggio |
| flutter_riverpod | ^2.6.1 | State management |
| dio | ^5.9.1 | HTTP client |
| firebase_auth | ^6.1.4 | Autenticazione |
| firebase_messaging | ^16.0.4 | Push notifications (FCM) |
| google_sign_in | ^7.2.0 | Google Sign-In |
| web_socket_channel | ^3.0.0 | WebSocket (presence) |
| flutter_secure_storage | ^9.2.2 | Storage crittografato (AES-GCM) |
| shared_preferences | ^2.5.4 | Preferenze locali |
| geolocator | ^14.0.2 | GPS / localizzazione |
| flutter_map | ^8.2.2 | Mappa OpenStreetMap |
| maplibre_gl | ^0.25.0 | Mappa MapLibre GL (alternativa) |
| lottie | ^3.3.2 | Animazioni Lottie |
| flutter_local_notifications | ^21.0.0 | Notifiche locali |
| qr_flutter | ^4.1.0 | Generazione QR code |
| skeletonizer | ^2.1.3 | Skeleton loading state |
| reorderable_grid_view | ^2.2.8 | Griglie drag-drop |
| intl | ^0.20.2 | Localizzazione date/numeri |
| json_serializable | ^6.12.0 | Code gen JSON |
| app_links | ^6.4.1 | Deep links |
| open_filex | ^4.7.0 | Apertura file (APK install) |

### Infrastruttura

| Tecnologia | Utilizzo |
|---|---|
| Raspberry Pi | Hosting backend self-hosted |
| Cloudflare Tunnel | Espone backend su internet (everydaylifecore.com) |
| Docker / docker-compose | PostgreSQL containerizzato |
| Firebase | Authentication + FCM push notifications |
| Gmail SMTP | Email transazionali (verifica, reset password) |
| GitHub API | Distribuzione APK tramite releases |

---

## 10. Backend — Struttura e Architettura

### Architettura a Layers (Clean Architecture)

```
EverydayLifeCore.sln
├── EverydayLifeCore.Core/           # Domain Layer
│   ├── Entities/                    # Entità di dominio
│   ├── Enums/                       # Enumerazioni di dominio
│   └── Options/                     # Configuration POCOs
│
├── EverydayLifeCore.Application/    # Application Layer
│   ├── Interfaces/                  # Contratti servizi (ITaskService, etc.)
│   ├── DTOs/                        # Data Transfer Objects
│   └── Constants/                   # Costanti applicazione
│
├── EverydayLifeCore.Infrastructure/ # Infrastructure Layer
│   ├── Data/
│   │   └── ApplicationDbContext.cs  # EF Core DbContext
│   ├── Services/                    # Implementazioni servizi
│   └── Migrations/                  # EF Core migrations
│
├── EverydayLifeCore.API/            # Presentation Layer
│   ├── Controllers/                 # HTTP controllers
│   ├── Auth/                        # Firebase + JWT handlers
│   ├── Presence/                    # WebSocket presence
│   ├── Handler/                     # Authentication handlers
│   └── Standards/                   # DI extensions
│
└── EverydayLifeCore.IntegrationTests/  # Test Suite
```

### Pipeline HTTP (ordine middleware)

```
Request
  ↓
ForwardedHeaders (X-Forwarded-* da proxy)
  ↓
SerilogRequestLogging (log strutturato ogni request)
  ↓
CORS (AllowAnyOrigin in dev, origins specifici in prod)
  ↓
HttpsRedirection (solo prod)
  ↓
WebSocket (keepalive 30s)
  ↓
Authentication (Firebase ID token validation)
  ↓
Authorization (role claims check)
  ↓
Routing → Controller Action
  ↓
Response
```

### Servizi Principali

#### UsersService
- `SyncUserAsync`: Crea/aggiorna utente da Firebase, crea liste default
- `RequestVerifyEmailAsync` / `VerifyAsync`: Flusso verifica email con token GUID (24h)
- `RequestResetPasswordAsync` / `ResetPasswordAsync`: Reset password con storico (ultimi 5)
- `RegisterFcmTokenAsync` / `RemoveFcmTokenAsync`: Gestione token FCM per push

#### GroupsService
- CRUD gruppi con verifica ruoli (Owner richiesto per delete, Admin per update)
- Generazione invite code casuale (~8 caratteri)
- `AddMemberToGroupAsync`: ricerca per email O username, aggiunta multipla
- `SendRequestToJoin` / `AcceptRequestToJoin` / `RejectRequestToJoin`: flusso join con approvazione
- `SetOrderAsync`: persiste ordine visivo gruppi per utente

#### TaskService
- CRUD task con verifica membership al gruppo della lista
- Validazione assegnatari (devono essere membri del gruppo)
- Calcolo occorrenze per task ripetibili (daily/weekly/monthly/yearly/full_custom)
- Salvataggio `recurrence_config` come JSON nel campo task
- `SetStatusAsync`: transizione stato con validazione business rules

#### ExpenseService
- `CreateExpenseAsync`: split automatico equo tra tutti i membri del gruppo
- `GetGroupBalancesAsync`: algoritmo semplificazione debiti (chi deve a chi)
- `MarkSplitAsPaidAsync`: segna quota individuale come pagata

#### FriendsService
- `SearchByEmailOrUsernameAsync`: ritorna `FriendSearchOutcome` (Found/NotFound/SameUser/AlreadyFriend/etc.)
- `SendFriendRequestAsync`: supporta auto-accept se richiesta reciproca, previene duplicati
- Gestione stati completi: Pending → Accepted/Rejected, Blocked, Removed
- Optimistic locking su `Friendship.lock_version` per race conditions

#### NotificationsService
- Notifiche polimorfiche con payload JSON custom
- `dedupe_key` per prevenire duplicati
- Tracciamento `delivery_status` e `sent_attempts`
- Supporto `route_name` per routing diretto dal tap

#### GitHubReleasesService
- Autenticazione GitHub App con JWT (non OAuth user)
- `GitHubInstallationTokenProvider`: genera token installazione con chiave PEM privata
- Fetch/crea releases del repo `everyday-life-core-mobile`

#### PresenceDirectory
- Singleton in-memory per mappare WebSocket connections
- Broadcast presence changes agli abbonati per scope
- `PresenceCleanupHostedService`: background job per pulizia connessioni stale

---

## 11. Mobile — Struttura e Architettura

### Feature-First Architecture

```
lib/
├── main_dev.dart / main_prod.dart   # Entry points (flavors)
├── app/
│   ├── app.dart                     # Root widget (ConsumerStatefulWidget)
│   ├── handlers/                    # App-level behavior via mixins
│   │   ├── app_deep_links.part.dart
│   │   ├── app_presence_lifecycle.part.dart
│   │   ├── app_updates.part.dart
│   │   ├── app_session_bootstrap.part.dart
│   │   └── app_homescreen_widget_actions.part.dart
│   └── ui/
│       ├── maintenance_page.dart
│       └── offline_page.dart
├── core/                            # Sistemi trasversali
│   ├── config/                      # DevConfig / ProdConfig
│   ├── network/                     # Dio client + interceptors
│   ├── providers/                   # Core providers Riverpod
│   ├── services/                    # FCM, local notifications
│   ├── theme/                       # 6 temi + dark mode
│   ├── widgets/                     # Widget riutilizzabili globali
│   └── errors/                      # Error localizer
└── features/
    ├── auth/                        # Login, register, verify, reset
    ├── home/                        # Dashboard principale
    ├── tasks/                       # Task management completo
    ├── shopping/                    # Liste della spesa
    ├── groups/                      # Gestione gruppi
    ├── friends/                     # Sistema amicizie
    ├── notifications/               # Inbox notifiche
    ├── parking/                     # Parcheggio + mappa
    ├── presence/                    # Debug/display presence
    ├── profile/                     # Profilo utente
    ├── settings/                    # Impostazioni (tema)
    ├── update/                      # OTA update system
    └── chat/                        # (In sviluppo — solo providers)
```

### Flavors (Dev / Prod)

| Aspetto | Dev | Prod |
|---|---|---|
| Firebase Project | `everyday-life-core-dev` | `everyday-life-core-b4105` |
| API Base URL | `http://10.0.2.2:7082/api` | `https://everydaylifecore.com/api` |
| TLS Bypass | Sì (solo localhost) | No |
| Logging Dio | Sì (PrettyDioLogger) | No |
| Debug Info | Visibile | Nascosto |

### Gestione Stato (Riverpod)

Pattern usati per tipo di dato:

| Pattern | Quando usare | Esempio |
|---|---|---|
| `Provider` | Dipendenze semplici, singoletti | `dioProvider`, `appConfigProvider` |
| `FutureProvider` | Dati async read-only | `tasksAllProvider`, `userGroupsProvider` |
| `FutureProvider.family` | Dati parametrizzati | `taskByIdProvider(id)` |
| `StateNotifierProvider` | Stato mutabile semplice | `appAvailabilityProvider`, `themeProvider` |
| `AsyncNotifierProvider` | Mutazioni async complesse | `tasksMutationControllerProvider` |

**Ciclo vita sessione:**
```dart
// Al login: bootstrap automatico
_bootstrapNotificationsOnStartupOnce()  // registra FCM token
_refreshFriendRequestsOnStartupOnce()   // carica amici

// Al logout: reset provider cache
ref.invalidate(currentUserProvider)
ref.invalidate(userGroupsProvider)
ref.invalidate(tasksAllProvider)
// ... tutti i provider session-scoped
```

### DIO Client e Interceptors

```
DioClient
├── BaseOptions
│   ├── connectTimeout: 15s
│   ├── receiveTimeout: 15s
│   └── Content-Type: application/json
└── Interceptors (in ordine)
    ├── AuthInterceptor
    │   └── Aggiunge "Authorization: Bearer {Firebase ID Token}"
    ├── ApiVersionInterceptor
    │   └── /tasks, /shopping, /github → prefissa /v1
    └── AvailabilityGuard
        ├── connectionError → setOffline()
        ├── response 500 → probeHealth() async
        └── health response → AppAvailabilityMode (normal/offline/maintenance)
```

**Flusso AvailabilityGuard:**
```
Request fallisce con connectionError
  → stato app = Offline
  → mostra OfflinePage

Request risponde 500
  → chiama GET /health in background
    → "normal" → mostra errore normale
    → "maintenance" → stato app = Maintenance → mostra MaintenancePage
    → timeout/error → stato app = Offline
```

---

## 12. Database — Schema Completo

### Tabelle (22 totali)

#### Utenti e Autenticazione

**`users`**
```
id                  INT PK
firebase_uid        VARCHAR UNIQUE NOT NULL
email               VARCHAR UNIQUE NOT NULL
username            VARCHAR UNIQUE           -- "nickname" pubblico
name                VARCHAR NOT NULL
surname             VARCHAR NOT NULL
full_name           VARCHAR                  -- denormalizzato
birth_date          TIMESTAMP
avatar_url          VARCHAR
role                INT                      -- UserSystemRole
last_login_at       TIMESTAMP
created_at          TIMESTAMP NOT NULL
updated_at          TIMESTAMP NOT NULL
password            VARCHAR                  -- Hash BCrypt (opzionale con Firebase)
```

**`user_fcm_tokens`**
```
id           INT PK
user_id      INT FK → users
token        VARCHAR NOT NULL
device_info  VARCHAR
created_at   TIMESTAMP
```

**`password_history`**
```
id               INT PK
user_id          INT FK → users
hashed_password  VARCHAR NOT NULL
created_at       TIMESTAMP
```

**`password_reset_tokens`**
```
id          INT PK
user_id     INT FK → users
token       VARCHAR NOT NULL
expires_at  TIMESTAMP NOT NULL
used        BOOL DEFAULT false
created_at  TIMESTAMP
```

**`verify_email_tokens`**
```
id          INT PK
email       VARCHAR NOT NULL
token       VARCHAR NOT NULL
expires_at  TIMESTAMP NOT NULL
used        BOOL DEFAULT false
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

#### Gruppi

**`groups`**
```
id             INT PK
name           VARCHAR NOT NULL
description    VARCHAR
invite_code    VARCHAR NOT NULL
is_active      BOOL DEFAULT true
avatar_url     VARCHAR
color          VARCHAR
category       INT                      -- GroupCategory enum
created_by_id  INT FK → users
created_at     TIMESTAMP
updated_at     TIMESTAMP
```

**`group_members`**
```
id         INT PK
user_id    INT FK → users
group_id   INT FK → groups
role       VARCHAR NOT NULL             -- Owner/Admin/Member/Guest
joined_at  TIMESTAMP
created_at TIMESTAMP
updated_at TIMESTAMP
UNIQUE (user_id, group_id)
```

**`group_membership_requests`**
```
id                    INT PK
group_id              INT FK → groups
requested_by_user_id  INT FK → users
decision_by_user_id   INT FK → users    -- nullable
status                INT               -- Pending/Accepted/Rejected/Cancelled/Expired
requested_at          TIMESTAMP
decided_at            TIMESTAMP         -- nullable
created_at            TIMESTAMP
```

#### Task Management

**`task_lists`**
```
id                    INT PK
name                  VARCHAR NOT NULL
description           VARCHAR
color                 VARCHAR
group_id              INT FK → groups    -- NULL = lista personale
owner_id              INT FK → users
display_order_tasks   JSONB              -- array di int per ordine task
version_order         INT                -- per conflict resolution
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

**`tasks`**
```
id                    INT PK
title                 VARCHAR NOT NULL
description           VARCHAR
category              VARCHAR            -- TaskCategory enum
priority_level        VARCHAR            -- PriorityLevel enum
status                VARCHAR            -- TaskStatus enum
due_date              TIMESTAMP
completed_at          TIMESTAMP
is_repeatable         BOOL DEFAULT false
recurrence_type       VARCHAR            -- daily/weekly/monthly/yearly/full_custom
recurrence_pattern    VARCHAR            -- stringa leggibile
recurrence_config     JSONB              -- configurazione completa (custom)
first_occurrence      TIMESTAMP
scheduled_occurrences JSONB              -- array di datetime
task_list_id          INT FK → task_lists
created_by_id         INT FK → users
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

**`task_assignments`**
```
id           INT PK
task_id      INT FK → tasks
user_id      INT FK → users
assigned_by  INT FK → users
assigned_at  TIMESTAMP
created_at   TIMESTAMP
updated_at   TIMESTAMP
```

#### Liste della Spesa

**`shopping_lists`**
```
id                          INT PK
name                        VARCHAR NOT NULL
description                 VARCHAR
color                       VARCHAR
group_id                    INT FK → groups    -- NULL = lista personale
owner_id                    INT FK → users
display_order_categories    JSONB              -- ordine categorie
version_order_categories    INT
display_order               INT
created_at                  TIMESTAMP
updated_at                  TIMESTAMP
```

**`shopping_categories`**
```
id                INT PK
shopping_list_id  INT FK → shopping_lists
name              VARCHAR NOT NULL
owner_id          INT FK → users
display_order     INT
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

**`shopping_category_configs`**
```
id                INT PK
shopping_list_id  INT FK → shopping_lists
user_id           INT FK → users
category_name     VARCHAR
order             INT
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

**`shopping_items`**
```
id                INT PK
shopping_list_id  INT FK → shopping_lists
category          VARCHAR
name              VARCHAR NOT NULL
quantity          INT
unit              VARCHAR
note              VARCHAR
is_checked        BOOL DEFAULT false
added_by_id       INT FK → users
assigned_to_id    INT FK → users         -- nullable
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

#### Spese Condivise

**`expenses`**
```
id            INT PK
title         VARCHAR NOT NULL
description   VARCHAR
amount        DECIMAL(18,2) NOT NULL
category      VARCHAR                    -- ExpenseCategory enum
expense_date  TIMESTAMP NOT NULL
notes         VARCHAR
group_id      INT FK → groups
paid_by_id    INT FK → users
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

**`expense_splits`**
```
id          INT PK
expense_id  INT FK → expenses
user_id     INT FK → users
amount      DECIMAL(18,2) NOT NULL
is_paid     BOOL DEFAULT false
paid_at     TIMESTAMP
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

#### Social

**`friendships`**
```
id                     INT PK
user_a_id              INT FK → users
user_b_id              INT FK → users
requested_by_user_id   INT FK → users
responded_by_user_id   INT FK → users    -- nullable
blocked_by_user_id     INT FK → users    -- nullable
status                 INT               -- FriendshipStatus enum
lock_version           INT DEFAULT 1     -- optimistic locking
requested_at           TIMESTAMP DEFAULT now()
responded_at           TIMESTAMP         -- nullable
blocked_at             TIMESTAMP         -- nullable
last_status_changed_at TIMESTAMP DEFAULT now()
created_at             TIMESTAMP DEFAULT now()
updated_at             TIMESTAMP DEFAULT now()
UNIQUE (user_a_id, user_b_id)
```

#### Altro

**`notifications`**
```
id                INT PK
title             VARCHAR NOT NULL
message           VARCHAR NOT NULL
type              VARCHAR               -- NotificationType enum
priority          VARCHAR
feature           VARCHAR
event_name        VARCHAR
entity_type       VARCHAR
route_name        VARCHAR
dedupe_key        VARCHAR               -- per deduplication
is_read           BOOL DEFAULT false
read_at           TIMESTAMP
is_sent           BOOL DEFAULT false
sent_at           TIMESTAMP
sent_attempts     INT DEFAULT 0
delivery_status   VARCHAR
delivery_error    VARCHAR
payload_json      TEXT                  -- dati custom
user_id           INT FK → users
actor_user_id     INT FK → users        -- chi ha generato l'evento
related_entity_id INT                   -- ID entità correlata
group_id          INT FK → groups
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

**`parking_locations`**
```
id               INT PK
user_id          INT FK → users
latitude         DOUBLE PRECISION NOT NULL
longitude        DOUBLE PRECISION NOT NULL
accuracy_meters  DOUBLE PRECISION
label            VARCHAR
note             VARCHAR
address          VARCHAR
floor_level      VARCHAR
is_active        BOOL DEFAULT true
created_at       TIMESTAMP
updated_at       TIMESTAMP
```

**`timers`**
```
id               INT PK
user_id          INT FK → users
name             VARCHAR NOT NULL
type             VARCHAR               -- TimerType enum
duration_minutes INT NOT NULL
start_time       TIMESTAMP
end_time         TIMESTAMP
is_active        BOOL
is_completed     BOOL
created_at       TIMESTAMP
updated_at       TIMESTAMP
```

**`users_lists_orders`**
```
id                   INT PK
user_id              INT FK → users UNIQUE
task_lists_order     JSONB              -- array di int
shopping_lists_order JSONB
groups_order         JSONB
created_at           TIMESTAMP
updated_at           TIMESTAMP
```

### Enumerazioni

| Enum | Valori |
|---|---|
| `TaskStatus` | ToDo, InProgress, Done, Overdue, Archived |
| `PriorityLevel` | Critical, High, Medium, Low |
| `TaskCategory` | Work, Home, Personal, Health, Family, Other |
| `UserRoleInGroup` | Owner(0), Admin(1), Member(2), Guest(3) |
| `FriendshipStatus` | Pending(0), Accepted(1), Rejected(2), Blocked(3), Removed(4) |
| `NotificationType` | TaskDue, TaskAssigned, TaskCompleted, General, MemberAdded, ... |
| `GroupCategory` | Work, Family, Friends, Project, Other |
| `ExpenseCategory` | Food, Transport, Rent, Utilities, Entertainment, Health, Other |
| `TimerType` | Configurable |
| `FriendSearchOutcome` | Found, NotFound, SameUser, AlreadyFriend, IncomingRequestPending, OutgoingRequestPending, Blocked |
| `SendFriendRequestOutcome` | RequestSent, AlreadyFriends, AlreadyPending, AutoAccepted, Blocked, SameUser |

---

## 13. API — Endpoint Completi

Base URL: `https://everydaylifecore.com/api/v1/`

Tutti gli endpoint (tranne health) richiedono: `Authorization: Bearer {Firebase ID Token}`

### Autenticazione e Utenti

| Metodo | Path | Descrizione |
|---|---|---|
| `POST` | `/users/sync` | Sincronizza utente Firebase ↔ DB (register/login) |
| `GET` | `/users/{id}` | Ottieni profilo utente |
| `PUT` | `/users/{id}` | Aggiorna profilo utente |
| `POST` | `/users/request-verify` | Richiede email di verifica |
| `PUT` | `/users/verify` | Verifica email con token |
| `POST` | `/users/request-reset` | Richiede reset password |
| `PUT` | `/users/reset` | Resetta password con token |
| `POST` | `/auth/fcm-token` | Registra token FCM per push |
| `DELETE` | `/auth/fcm-token` | Rimuove token FCM |

### Gruppi

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/groups` | Lista gruppi dell'utente |
| `POST` | `/groups` | Crea nuovo gruppo |
| `GET` | `/groups/{id}` | Dettaglio gruppo |
| `PUT` | `/groups/{id}` | Aggiorna gruppo (Admin+) |
| `DELETE` | `/groups/{id}` | Elimina gruppo (Owner) |
| `POST` | `/groups/{id}/leave` | Esci dal gruppo |
| `POST` | `/groups/{groupId}/members` | Aggiungi membri (email/username) |
| `DELETE` | `/groups/{groupId}/members` | Rimuovi membri |
| `PATCH` | `/groups/{groupId}/members/role` | Cambia ruolo membro |
| `POST` | `/groups/{groupId}/join-requests` | Invia richiesta join (con invite code) |
| `GET` | `/groups/{groupId}/join-requests` | Lista richieste pendenti (Admin+) |
| `POST` | `/groups/{groupId}/join-requests/{requesterId}/accept` | Accetta richiesta (Admin+) |
| `POST` | `/groups/{groupId}/join-requests/{requesterId}/reject` | Rifiuta richiesta (Admin+) |
| `POST` | `/groups/set-order` | Salva ordine visivo gruppi |

### Task Management

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/tasks` | Task assegnati all'utente |
| `POST` | `/tasks` | Crea task |
| `GET` | `/tasks/{id}` | Dettaglio task |
| `PUT` | `/tasks/{id}` | Aggiorna task |
| `DELETE` | `/tasks/{id}` | Elimina task |
| `POST` | `/tasks/{id}/set-status` | Cambia stato task |
| `POST` | `/tasks/lists` | Crea task list |
| `GET` | `/tasks/lists/{id}` | Dettaglio task list |
| `PUT` | `/tasks/lists/{id}` | Aggiorna task list |
| `DELETE` | `/tasks/lists/{id}` | Elimina task list |
| `POST` | `/tasks/lists/set-order` | Salva ordine task list |

### Liste della Spesa

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/shopping/lists` | Lista delle shopping lists |
| `POST` | `/shopping/lists` | Crea shopping list |
| `PUT` | `/shopping/lists/{id}` | Aggiorna lista |
| `DELETE` | `/shopping/lists/{id}` | Elimina lista |
| `POST` | `/shopping/lists/set-order` | Salva ordine liste |
| `GET` | `/shopping/lists/{listId}/categories/items` | Categorie + items di una lista |
| `POST` | `/shopping` | Crea item |
| `GET` | `/shopping/{id}` | Dettaglio item |
| `PUT` | `/shopping/{id}` | Aggiorna item |
| `DELETE` | `/shopping/{id}` | Elimina item |
| `POST` | `/shopping/{id}/toggle-check` | Toggle spuntato/non spuntato |

### Spese Condivise

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/expenses?groupId=X` | Spese del gruppo |
| `POST` | `/expenses` | Crea spesa (auto-split) |
| `GET` | `/expenses/{id}` | Dettaglio spesa |
| `DELETE` | `/expenses/{id}` | Elimina spesa (solo creatore) |
| `PATCH` | `/expenses/{expenseId}/splits/{splitId}/paid` | Segna quota come pagata |
| `GET` | `/expenses/balances?groupId=X` | Bilanci del gruppo (chi deve a chi) |

### Amicizie

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/friends/search?identifier=X` | Cerca per email o username |
| `GET` | `/friends` | Lista amici accettati |
| `GET` | `/friends/blocked` | Lista utenti bloccati |
| `GET` | `/friends/requests/incoming` | Richieste in entrata |
| `GET` | `/friends/requests/outgoing` | Richieste in uscita |
| `POST` | `/friends/requests` | Invia richiesta amicizia |
| `POST` | `/friends/requests/{requestId}/accept` | Accetta richiesta |
| `POST` | `/friends/requests/{requestId}/reject` | Rifiuta richiesta |
| `POST` | `/friends/{friendId}/block` | Blocca utente |
| `POST` | `/friends/{friendId}/unblock` | Sblocca utente |
| `DELETE` | `/friends/{friendId}` | Rimuovi amico |

### Notifiche

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/notifications` | Lista notifiche utente |
| `GET` | `/notifications/{id}` | Dettaglio notifica |
| `PATCH` | `/notifications/{id}/read` | Segna come letta |
| `DELETE` | `/notifications/{id}` | Elimina notifica |
| `POST` | `/notifications/task/{taskId}/notify-group` | Notifica gruppo su task |
| `POST` | `/notifications/group/{groupId}/notify-members` | Notifica tutti i membri |

### Parcheggio

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/parking` | Lista parcheggi utente |
| `POST` | `/parking` | Salva nuovo parcheggio |
| `PUT` | `/parking/{id}` | Aggiorna parcheggio |
| `DELETE` | `/parking/{id}` | Elimina parcheggio |

### GitHub / Updates

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/github/releases` | Lista releases app mobile |
| `POST` | `/github/releases` | Crea release (Admin only) |

### Sistema

| Metodo | Path | Descrizione |
|---|---|---|
| `GET` | `/health` | `{ status: "normal" \| "maintenance" }` |
| `GET` | `/metrics` | Metriche Prometheus (OpenTelemetry) |
| `WS` | `/presence` | WebSocket presence real-time |

---

## 14. Sistema di Autenticazione e Sicurezza

### Flusso Autenticazione

```
CLIENT                    FIREBASE                    BACKEND
  │                           │                          │
  │── signIn(email, pw) ──────▶│                          │
  │◀── ID Token ──────────────│                          │
  │                           │                          │
  │── POST /users/sync ───────────────────────────────────▶│
  │   (Authorization: Bearer {ID Token})                  │
  │                           │   ── verifyIdToken() ────▶│
  │                           │◀── {uid, email, name} ───│
  │                           │                  crea/aggiorna user
  │◀── { user: UserDto } ─────────────────────────────────│
  │                           │                          │
  │── API calls ──────────────────────────────────────────▶│
  │   (Bearer ID Token rinnovato automaticamente)         │
```

**Firebase ID Token:**
- JWT firmato da Firebase, validità ~1 ora
- Rinnovato automaticamente da Firebase SDK sul client
- Backend valida con Firebase Admin SDK (chiave pubblica Firebase)
- Contiene: `uid`, `email`, `name`, custom claims

### Sicurezza Password (opzionale, affiancato a Firebase)

- Hash con **BCrypt** (auto-salting)
- Storico ultime **5 password** (no riuso)
- Reset via token GUID one-time con scadenza **24 ore**
- Password inviata solo tramite email (HTTPS)

### Sicurezza API

- Ogni endpoint verifica che l'utente sia membro della risorsa richiesta
- Ruoli gruppo applicati (Owner/Admin/Member/Guest)
- **Optimistic locking** su `Friendship` con `lock_version` per race conditions
- **FluentValidation** su tutti i DTO in ingresso
- Nessuna esposizione di stack trace al client

### Sicurezza Mobile

- **FlutterSecureStorage** per preferenze sensibili (tema, eventualmente token)
  - Android: AES-GCM + RSA-ECB OAEP (KeyStore)
  - iOS: Keychain (first_unlock_this_device)
- TLS bypass **solo** in dev flavor, **solo** per localhost, **solo** non in release mode
- Token Firebase mai salvato esplicitamente (gestito da Firebase SDK)

### CORS

- Development: `AllowAnyOrigin` (per test locali)
- Production: origini specifiche configurate

---

## 15. Real-Time — WebSocket Presence

### Connessione

```
URL: wss://everydaylifecore.com/presence
Auth: Authorization: Bearer {Firebase ID Token}
      oppure: ?token={Firebase ID Token}
```

### Architettura

```
App Mobile
  ↓ WebSocket (TLS)
PresenceWebSocketHandler (ASP.NET Core)
  ↓
PresenceDirectory (Singleton in-memory)
  ├── connections: Map<string uid, WebSocket>
  ├── subscriptions: Map<string scope, List<uid>>
  └── presence: Map<string uid, UserPresence>
```

### Protocollo Messaggi (JSON)

**Client → Server:**
```jsonc
// Aggiorna presenza
{ "type": "presence_update", "firebaseUid": "uid123", "status": "online" }

// Ping keepalive
{ "type": "ping" }

// Sottoscrivi a uno scope
{ "type": "presence_subscribe", "scope": "group", "scopeId": "123" }

// Richiedi snapshot completo
{ "type": "presence_list_request", "scope": "group", "scopeId": "123" }

// Annulla sottoscrizione
{ "type": "presence_unsubscribe", "scope": "group", "scopeId": "123" }
```

**Server → Client:**
```jsonc
// Aggiornamento singolo
{ "type": "presence_update", "firebaseUid": "uid123", "status": "online",
  "userName": "Mario", "userProfileImage": "...", "lastSeen": "2026-04-08T..." }

// Snapshot iniziale
{ "type": "presence_snapshot", "users": [...] }

// Delta update (efficiente)
{ "type": "presence_delta", "upserts": [...], "removed": ["uid456"] }

// Pong
{ "type": "pong" }

// Errore
{ "type": "error", "code": "INVALID_PAYLOAD", "message": "..." }
```

### Scopes Disponibili

| Scope | Descrizione |
|---|---|
| `global` | Tutti gli utenti connessi |
| `group` | Utenti connessi in un gruppo specifico |
| `friends` | Solo amici dell'utente |
| `users` | Lista specifica di utenti per firebaseUid |

### Gestione Connessioni (Mobile)

- **Reconnect automatico** con backoff esponenziale: 2s → 5s → 10s → 20s → 30s (max)
- **Ping ogni 30 secondi** per keepalive
- **Lifecycle tracking**: app in foreground → `online`, in background/paused → `offline` (debounce 5s)
- **Token redaction** automatica nei log per sicurezza

---

## 16. Sistema Notifiche

### Architettura Multi-Layer

```
EVENTO (es. task assegnato)
  ↓
NotificationsService (BE)
  ├── Crea Notification record in DB
  ├── Cerca FCM token dell'utente
  └── Invia via Firebase FCM
         ↓
    App Mobile (FCM)
      ├── Foreground → LocalNotificationsService (mostra notifica locale)
      ├── Background/Killed → Notifica di sistema (FCM)
      └── Tap → FcmService._handleNotificationTap()
                  ├── Event Handler (es. group_member_added → GroupsPage)
                  ├── Feature Handler (es. feature=tasks → TasksPage)
                  └── Fallback → NotificationsPage
```

### Deduplicazione Notifiche (Mobile)

Fingerprint calcolato da:
```
source | messageId | eventName | feature | taskId | groupId | entityId
```
Cache max **64 fingerprints** (FIFO eviction). Previene notifiche doppie per:
- App restart veloce
- Doppio invio FCM
- Tap multipli rapidi

### Routing dal Tap

| Event | Destinazione |
|---|---|
| `group_member_added` | GroupsPage con gruppo selezionato |
| `task_added` | TasksPage |
| `task_due_date_reminder` | TasksPage |
| Feature `groups` | GroupsPage con gruppo selezionato |
| Feature `tasks` | TasksPage |
| Feature `notifications` | NotificationsPage inbox |
| Default | NotificationsPage inbox |

### Tipi Notifiche Backend

```
TaskDue              — Task in scadenza
TaskAssigned         — Task assegnato a te
TaskCompleted        — Task completato
TimerExpired         — Timer scaduto
MedicineReminder     — Promemoria farmaco
BillDue              — Bolletta in scadenza
SubscriptionExpiring — Abbonamento in scadenza
ExpenseBalance       — Aggiornamento bilancio spese
CleaningTurn         — Turno pulizie
General              — Notifica generica
```

---

## 17. Sistema di Aggiornamento App

Il sistema permette aggiornamenti OTA (Over-The-Air) senza passare dal Play Store.

### Flusso Completo

```
App Avvio
  ↓
UpdateService.checkForUpdate()
  ↓ GET /github/releases/latest (via backend)
  ↓ Backend chiama GitHub API con GitHub App JWT
  ↓ Ritorna: { tagName, downloadUrl, sha256, body }
  ↓
Confronto versione: parsedVersion.buildNumber > currentBuildNumber?
  │
  ├── NO → nessun aggiornamento
  └── SI → UpdateInfo { updateAvailable: true, isCritical, forceUpdate }
         ↓
    _AppUpdatesHandler mostra:
      ├── isCritical=true → Dialog modale (non dismissibile)
      ├── forceUpdate=true → Dialog forzato
      └── normale → SnackBar con azione "Aggiorna"
         ↓
    Utente conferma → UpdatePage
         ↓
    UpdateService.downloadApk(progress callback)
      ├── Verifica spazio disponibile
      ├── Download in ApplicationCacheDirectory
      └── SHA256 validation (confronta con release)
         ↓
    InstallService.installApk(path) → open_filex
         ↓
    Sistema Android installa APK
```

### Parsing Versione

Tag name formato: `v{major}.{minor}.{patch}+{buildNumber}`
Esempio: `v0.11.48+195`

```dart
ParsedVersion {
  versionName: "0.11.48",
  buildNumber: 195
}
```

### Flag Speciali (nel body della release GitHub)

| Flag nel body | Comportamento |
|---|---|
| `CRITICAL` | Dialog non dismissibile, aggiornamento obbligatorio |
| `FORCE UPDATE` | Come CRITICAL |
| (nessuno) | SnackBar suggerimento opzionale |

---

## 18. Infrastruttura e Deployment

### Produzione

```
Raspberry Pi (ARM)
├── ASP.NET Core 8 (processo native)
│   └── Porta: 5000 (interno)
├── Docker
│   └── PostgreSQL 16 Alpine
│       └── Volume: postgres_data
│       └── Porta: 5432 (solo interno)
└── Cloudflare Tunnel (cloudflared)
    └── everydaylifecore.com → localhost:5000
        ├── HTTPS automatico (Cloudflare cert)
        └── WSS supportato
```

### Sviluppo Locale

```bash
# PostgreSQL via Docker
docker-compose up -d

# Backend
cd EverydayLifeCore.API
dotnet run

# Mobile (Android Emulator)
flutter run --flavor dev -t lib/main_dev.dart
```

### Variabili di Configurazione Chiave

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=everyday_life;Username=...;Password=..."
  },
  "Firebase": {
    "ProjectId": "everyday-life-core-dev",
    "ServiceAccountPath": "./firebase-adminsdk-dev.json"
  },
  "GmailOptions": {
    "Host": "smtp.gmail.com",
    "Port": 587,
    "Email": "...",
    "Password": "..."
  },
  "GitHubApp": {
    "AppId": 2850598,
    "InstallationId": 109676530,
    "PrivateKeyPem": "./../secrets/github-app-private-key.pem",
    "Owner": "Everyday-Life-Core",
    "Repo": "everyday-life-core-mobile"
  },
  "Maintenance": { "Enabled": false }
}
```

### Build App Mobile

```bash
# Release APK (Android)
flutter build apk --release --flavor prod -t lib/main_prod.dart

# App Bundle (Play Store)
flutter build appbundle --release --flavor prod -t lib/main_prod.dart

# Code generation (JSON serializer + l10n)
flutter pub run build_runner build --delete-conflicting-outputs

# Icons e splash
flutter pub run flutter_launcher_icons:main
flutter pub run flutter_native_splash:create
```

---

## 19. Testing

### Backend — Integration Tests

**Framework:** xUnit + ASP.NET Core TestServer

**Struttura:**
```
EverydayLifeCore.IntegrationTests/
├── Auth/           # Test registrazione, login, token
├── Groups/         # Test CRUD gruppi, ruoli, membership
├── Tasks/          # Test task, assegnazioni, ricorrenze
├── Shopping/       # Test liste e items
├── Presence/       # Test WebSocket
└── Health/         # Test endpoint di sistema
```

**Autenticazione nei test:**
- `TestAuthenticationHandler`: sostituisce Firebase
- Header `X-Firebase-UID: {uid}` per autenticarsi
- `TestDataBuilder`: helper per setup fixtures

**Database:**
- Environment E2E: provisioning automatico DB di test
- Cleanup dopo ogni test suite
- Dati isolati per test

### Mobile — Testing

Attualmente nessuna test suite automatizzata implementata nel mobile. Previsto in futuro:
- Widget tests per componenti critici
- Integration tests per flussi auth
- Unit tests per services

---

## 20. Logging e Monitoring

### Serilog (Backend)

**Configurazione:**
```csharp
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)    // da appsettings
    .Enrich.FromLogContext()                  // context automatico
    .WriteTo.Console()                        // stdout
    .WriteTo.File(
        "logs/everyday-life-.txt",
        rollingInterval: RollingInterval.Day  // rotazione giornaliera
    )
    .CreateLogger();
```

**Log Level per ambiente:**
- Development: `Debug` (incluse query SQL)
- Production: `Information` (no query SQL, EF a `Warning`)

**Request logging automatico:**
Ogni request HTTP viene loggata con: metodo, path, status code, durata, IP

### OpenTelemetry + Prometheus (Backend)

**Metriche raccolte:**
- HTTP request duration e count (per endpoint)
- HTTP response sizes
- DB command duration (EF Core)
- .NET Runtime: GC, heap size, thread pool, CPU
- Custom business metrics (opzionale)

**Endpoint:** `GET /metrics` in formato Prometheus

**Utilizzo suggerito:** Prometheus + Grafana su Raspberry Pi per dashboard real-time

### Logging Mobile

**Dio PrettyLogger** (solo dev flavor):
- Log colorati per request/response HTTP
- Body truncato per risposte grandi

**WebSocket Logger** (PresenceWebSocketService):
- Solo SUBSCRIBE e UNSUBSCRIBE loggati (riduce noise)
- Token redact automatico: `Bearer eyJ...` → `Bearer [REDACTED]`
- Marker emoji: 🟩 SUBSCRIBE, 🟥 UNSUBSCRIBE, 🟨 OTHER

**debugPrint** selettivi:
- Flussi auth (per debug registrazione/login)
- Check aggiornamenti
- Connessione WebSocket

---

*Fine documentazione — Versione 1.0 — Aprile 2026*

> **Nota:** Questa documentazione è stata generata da analisi automatica del codebase di entrambi i repository (backend + mobile). Alcune sezioni relative a funzionalità "da sviluppare" potrebbero evolvere rispetto a quanto scritto qui. Si raccomanda di aggiornare questo documento ad ogni milestone significativa.
