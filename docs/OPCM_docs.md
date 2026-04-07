# One Piece Card Market (OPCM)

> Applicazione desktop per la gestione della collezione di carte del gioco di carte collezionabili **One Piece TCG**, con monitoraggio prezzi in tempo reale tramite integrazione con CardMarket.

---

## Indice

- [Panoramica](#panoramica)
- [Funzionalità](#funzionalità)
- [Stack Tecnologico](#stack-tecnologico)
- [Architettura](#architettura)
- [Struttura del Progetto](#struttura-del-progetto)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Frontend](#frontend)
- [Installazione e Avvio](#installazione-e-avvio)
- [Configurazione](#configurazione)
- [Flusso Dati](#flusso-dati)
- [Design Pattern Utilizzati](#design-pattern-utilizzati)

---

## Panoramica

**One Piece Card Market (OPCM)** è un'applicazione desktop Windows progettata per i collezionisti del gioco di carte **One Piece TCG**. Permette di catalogare l'intera collezione di carte, tracciarne lo stato, la condizione e la quantità, e integrare il tutto con la piattaforma **CardMarket** per il monitoraggio dei prezzi di mercato in tempo reale.

L'applicazione segue un'architettura **client-server**: il backend espone una REST API costruita con ASP.NET Core 8, mentre il frontend è un'applicazione **Windows Forms** con interfaccia moderna e tema scuro. Il database è ospitato su cloud tramite **Aiven (PostgreSQL)**.

---

## Funzionalità

### Gestione Collezione
- **Catalogazione carte**: inserimento completo con espansione, numero, nome, rarità, condizione e quantità
- **Ricerca avanzata**: filtri multipli combinabili (espansione, rarità, condizione, nome/numero, stato CardMarket)
- **Ordinamento flessibile**: 10 criteri di ordinamento (per carta, nome, rarità, condizione, quantità — ascendente/discendente)
- **Modifica carte**: aggiornamento di tutti i campi con validazione duplicati
- **Soft-delete**: eliminazione logica reversibile — i dati non vengono mai persi dal database
- **Ripristino carte**: recupero di carte precedentemente eliminate

### Integrazione CardMarket
- **Flag LoadCM**: marcatura delle carte già caricate sul marketplace CardMarket
- **Toggle rapido**: attivazione/disattivazione del flag direttamente dalla lista
- **Filtro per stato**: possibilità di filtrare la visualizzazione per carte caricate/non caricate su CardMarket

### Gestione Espansioni
- **Archivio espansioni**: gestione completa di tutti i set pubblicati di One Piece TCG
- **Codice univoco**: ogni espansione ha un codice numerico univoco
- **Visualizzazione formattata**: le carte vengono visualizzate nel formato `ESPANSIONE-NUM` (es. `OP01-001`)

### Interfaccia Utente
- **Tema Dark/Green**: interfaccia moderna con tema scuro e accenti verdi tramite MetroModernUI
- **DataGrid interattiva**: lista carte con colonne configurabili e azioni inline
- **Messaggi contestuali**: feedback visivo con messaggi di successo/errore/conferma personalizzati
- **Avvio automatico backend**: il frontend avvia automaticamente il processo WebApi in produzione

---

## Stack Tecnologico

| Componente | Tecnologia | Versione |
|---|---|---|
| Backend API | ASP.NET Core Web API | .NET 8.0 |
| ORM | Entity Framework Core | 8.0.8 |
| Database | PostgreSQL (Aiven Cloud) | - |
| Frontend | Windows Forms | .NET Framework 4.8 |
| UI Framework | MetroModernUI | 1.4.0.0 |
| Mapper | AutoMapper | 13.0.1 |
| JSON Serialization | Newtonsoft.Json | 13.0.3 |
| API Documentation | Swagger / Swashbuckle | 6.4.0 |
| DB Driver | Npgsql EF Core | 8.0.8 |

---

## Architettura

Il progetto segue un'architettura **N-Tier** con separazione chiara delle responsabilità:

```
+-----------------------------------------------------------+
|                  OPCM-FE (Windows Forms)                  |
|  +----------+  +----------+  +----------+  +----------+  |
|  |   Home   |  | CardList |  | NewCard  |  |  Edit    |  |
|  +----------+  +----------+  +----------+  +----------+  |
|                   Gateway Layer (HttpClient)               |
+------------------------+----------------------------------+
                         |  HTTP/REST (JSON)
+------------------------v----------------------------------+
|              WebApi (ASP.NET Core 8)                      |
|  +----------------------+  +---------------------------+  |
|  |   CardsController    |  |   ExpansionController     |  |
|  +-----------+----------+  +------------+--------------+  |
|              |                          |                  |
|  +-----------v----------+  +------------v--------------+  |
|  |     CardService      |  |    ExpansionService       |  |
|  +-----------+----------+  +------------+--------------+  |
|              |  AutoMapper              |                  |
|  +-----------v--------------------------v--------------+  |
|  |         BaseRepository<T, TDbContext>               |  |
|  +---------------------------+------------------------+   |
|                              |  EF Core                   |
+------------------------------+----------------------------+
                               |
+------------------------------v----------------------------+
|              PostgreSQL (Aiven Cloud)                     |
|              opcm-opcm.l.aivencloud.com                   |
+-----------------------------------------------------------+
```

### Livelli Architetturali

| Livello | Responsabilità |
|---|---|
| **Presentation (DTO/Mapper)** | Trasformazione dati tra entità DB e oggetti di trasporto |
| **Controllers** | Ricezione richieste HTTP, delega ai Service, risposta JSON |
| **Services** | Logica di business, validazioni, orchestrazione repository |
| **Repositories** | Accesso dati generico, query LINQ, astrazione EF Core |
| **Db (Models/Context)** | Entità EF Core e configurazione del DbContext PostgreSQL |

---

## Struttura del Progetto

```
OnePieceCardMarket/
|
+-- Db/                                 # Entità EF Core e DbContext
|   +-- Models/
|   |   +-- Card.cs                     # Entità carta
|   |   +-- Expansion.cs               # Entità espansione
|   +-- Context/
|       +-- OpcmContext.cs             # DbContext con config PostgreSQL
|
+-- Repositories/                       # Data Access Layer
|   +-- BaseRepository.cs              # Repository generico CRUD con reflection
|
+-- Services/                           # Business Logic Layer
|   +-- Services/
|   |   +-- CardService.cs             # Logica carte + validazioni
|   |   +-- ExpansionService.cs        # Logica espansioni
|   +-- Responses/
|       +-- ResponseBase.cs            # Risposta base (Success + Message)
|       +-- ResponseCreate.cs          # Risposta con oggetto creato
|       +-- ResponseException.cs       # Risposta errore con StackTrace
|
+-- Presentation/                       # DTO e Configurazione AutoMapper
|   +-- DTO/
|   |   +-- CardDTO.cs
|   |   +-- ExpansionDTO.cs
|   +-- Mapper/
|       +-- Mapper.cs                  # Profili AutoMapper Entity <-> DTO
|
+-- Controllers/                        # REST API Endpoints
|   +-- CardsController.cs
|   +-- ExpansionController.cs
|
+-- WebApi/                             # Host ASP.NET Core
|   +-- Program.cs                     # Configurazione DI, middleware, CORS
|   +-- Standards/
|       +-- ServiceCollectionExtensions.cs  # Registrazione servizi DI
|
+-- OPCM-FE/                            # Windows Forms Application
|   +-- Forms/
|   |   +-- Home.cs                    # Form principale / launcher
|   |   +-- CardList.cs                # Lista carte con filtri e azioni
|   |   +-- NewCard.cs                 # Inserimento nuova carta
|   |   +-- EditCard.cs                # Modifica carta esistente
|   |   +-- NewExpansion.cs            # Inserimento nuova espansione
|   +-- Gateway/
|   |   +-- CardGateway.cs             # Client HTTP per endpoint carte
|   |   +-- ExpansionGateway.cs        # Client HTTP per endpoint espansioni
|   +-- DTO/
|   |   +-- CardDTO.cs                 # DTO con proprietà calcolata ExpansionNumber
|   |   +-- ExpansionDTO.cs
|   +-- Customizations/
|   |   +-- MetroFormBase.cs           # Base form con tema Dark/Green
|   |   +-- BorderedMetroButton.cs     # Button con bordo verde
|   |   +-- ControlMetroButton.cs      # Button controllo
|   +-- MessageBoxes/
|   |   +-- CustomMessageBox.cs        # Dialoghi success/error/confirm
|   +-- Connections/
|   |   +-- BackendConnection.cs       # Verifica connessione backend
|   +-- App.config                     # URL backend configurabile
|
+-- OPCM-FE-Installer/                  # Pacchetto installer Windows
    +-- OPCM-FE-Installer.aip           # Progetto Advanced Installer
    +-- OPCM/
        +-- OPCM.msi                    # Installer MSI generato
```

---

## Database Schema

### Tabella `Card`

| Colonna | Tipo | Vincoli | Descrizione |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Identificatore auto-incrementale |
| `expansion` | INTEGER | NOT NULL | Riferimento al codice espansione |
| `number` | INTEGER | NOT NULL | Numero della carta nell'espansione |
| `name` | VARCHAR | - | Nome della carta |
| `rarity` | VARCHAR | NOT NULL | Rarità (Manga Rare, Special Rare, ecc.) |
| `condition` | VARCHAR | NOT NULL | Condizione fisica (Mint, Near Mint, ecc.) |
| `quantity` | INTEGER | NOT NULL | Quantità posseduta |
| `disabled` | BOOLEAN | DEFAULT FALSE | Flag soft-delete |
| `load_cm` | BOOLEAN | DEFAULT FALSE | Flag CardMarket caricamento |

**Indice di unicità logica**: `(expansion, number, rarity, condition)` — il Service impedisce duplicati su questa combinazione.

### Tabella `Expansion`

| Colonna | Tipo | Vincoli | Descrizione |
|---|---|---|---|
| `id` | SERIAL | PRIMARY KEY | Identificatore auto-incrementale |
| `code` | INTEGER | UNIQUE, NOT NULL | Codice numerico espansione |
| `expansion` | VARCHAR | NOT NULL | Nome espansione (es. "OP-01 Romance Dawn") |

### ERD (Entity Relationship)

```
+---------------------+          +---------------------+
|       Card          |          |      Expansion      |
+---------------------+          +---------------------+
| id (PK)             |          | id (PK)             |
| expansion  ---------+----------> code (UNIQUE)       |
| number              |          | expansion           |
| name                |          +---------------------+
| rarity              |
| condition           |
| quantity            |
| disabled            |
| load_cm             |
+---------------------+
```

> La relazione expansion -> expansion.code e' gestita a livello applicativo (Service Layer), non tramite FK a livello DB, per garantire maggiore flessibilita' nella gestione dei dati storici.

---

## API Reference

Base URL: `https://localhost:7212`

### Cards Endpoints

#### `GET /card`
Recupera tutte le carte attive (non disabilitate).

**Query Parameters:**

| Parametro | Tipo | Descrizione |
|---|---|---|
| `id` | int? | Se specificato, ritorna solo la carta con quell'ID |

**Response 200:**
```json
{
  "success": true,
  "message": "OK",
  "item": [
    {
      "id": 1,
      "expansion": 1,
      "number": 1,
      "name": "Monkey D. Luffy",
      "rarity": "Leader",
      "condition": "Near Mint",
      "quantity": 4,
      "disabled": false,
      "loadCM": true
    }
  ]
}
```

---

#### `GET /card/search`
Ricerca avanzata con filtri multipli.

**Query Parameters:**

| Parametro | Tipo | Descrizione |
|---|---|---|
| `loadCM` | bool? | Filtra per stato CardMarket |
| `expansion` | int? | Filtra per codice espansione |
| `rarity` | string? | Filtra per rarità |
| `condition` | string? | Filtra per condizione |
| `order` | int? | Criterio di ordinamento (0-9) |
| `text` | string? | Ricerca libera su nome o numero |

**Criteri di ordinamento:**

| Valore | Ordinamento |
|---|---|
| 0 | Per carta (Expansion + Number) ASC |
| 1 | Per carta DESC |
| 2 | Per nome ASC |
| 3 | Per nome DESC |
| 4 | Per rarità ASC |
| 5 | Per rarità DESC |
| 6 | Per condizione ASC |
| 7 | Per condizione DESC |
| 8 | Per quantità ASC |
| 9 | Per quantità DESC |

---

#### `POST /card`
Inserisce una nuova carta nella collezione.

**Request Body:**
```json
{
  "expansion": 1,
  "number": 17,
  "name": "Roronoa Zoro",
  "rarity": "Super Rare",
  "condition": "Near Mint",
  "quantity": 2,
  "loadCM": false
}
```

**Logica di business:**
- Verifica duplicati su `(expansion, number, rarity, condition)`
- Se la carta esiste ma e' disabilitata: risposta con suggerimento di ripristino
- Se la carta esiste ed e' attiva: errore di duplicato

**Response 200 (successo):**
```json
{ "success": true, "message": "Carta inserita con successo." }
```

**Response 200 (duplicato attivo):**
```json
{ "success": false, "message": "La carta e' gia' presente nella collezione." }
```

---

#### `PUT /card`
Modifica una carta esistente.

**Query Parameters:** `id` (int, required)

**Request Body:** stesso schema di POST

---

#### `PUT /card/check-load`
Toggles il flag `LoadCM` per la carta specificata.

**Query Parameters:** `id` (int, required)

---

#### `PUT /card/delete`
Soft-delete: disabilita la carta (la rende invisibile senza eliminarla dal DB).

**Query Parameters:** `id` (int, required)

---

#### `PUT /card/revert`
Ripristina una carta precedentemente disabilitata.

**Query Parameters:** `id` (int, required)

---

### Expansion Endpoints

#### `GET /expansion`
Recupera tutte le espansioni ordinate per codice.

**Response 200:**
```json
{
  "success": true,
  "item": [
    { "id": 1, "code": 1, "expansion": "OP-01 Romance Dawn" },
    { "id": 2, "code": 2, "expansion": "OP-02 Paramount War" }
  ]
}
```

---

#### `POST /expansion`
Inserisce una nuova espansione.

**Request Body:**
```json
{
  "code": 9,
  "expansion": "OP-09 The Four Emperors"
}
```

**Logica di business:**
- Verifica unicita' del `code`
- Errore se il codice e' gia' registrato

---

### Swagger UI

In modalita' `Development`, l'interfaccia Swagger e' accessibile a:
```
https://localhost:7212/swagger
```

---

## Frontend

### Schermate Principali

#### Home Form
Punto di ingresso dell'applicazione. In modalita' produzione avvia automaticamente il processo `WebApi.exe` e verifica la disponibilita' del backend prima di abilitare la navigazione.

**Azioni disponibili:**
- `New Card` — apre il form di inserimento
- `New Expansion` — apre il form per le espansioni
- `Card List` — apre la lista principale (abilitato solo se esistono carte)

#### CardList Form
Schermata principale di lavoro. Mostra la lista completa delle carte con filtri e azioni inline.

**Filtri disponibili:**
- Stato LoadCM (Tutti / Caricati / Non caricati)
- Espansione (ComboBox con tutte le espansioni)
- Rarita' (Manga Rare, Promo, Special Rare, Super Rare, Rare, Uncommon, Common, Leader)
- Condizione (Mint, Near Mint, Excellent, Good, Light Played, Played, Poor)
- Ordinamento (10 criteri)
- Testo libero (cerca su nome e numero)

**Colonne DataGrid:**

| Colonna | Tipo | Note |
|---|---|---|
| LoadCM | CheckBox | Toggle diretto |
| Expansion-Number | String | Es. "OP01-001" |
| Name | String | Nome carta |
| Rarity | String | Rarita' |
| Condition | String | Condizione fisica |
| Quantity | Int | Quantita' posseduta |
| Azioni | Buttons | Modifica / Elimina |

#### NewCard / EditCard Form
Form con validazione per inserimento e modifica carte.

**Validazioni:**
- Number: solo numerico, range 0-200, formattato a 3 cifre
- Quantity: solo numerico, deve essere > 0
- Tutti i campi obbligatori sono verificati prima dell'invio

#### NewExpansion Form
Form semplice per la registrazione di nuove espansioni con verifica unicita' del codice.

---

### Gateway Layer

I Gateway sono classi che incapsulano tutta la comunicazione HTTP tra il frontend e il backend.

```csharp
// Esempio: CardGateway
public async Task<IEnumerable<CardDTO>> SearchCard(
    bool? loadCM, int? expansion, string rarity,
    string condition, int? order, string text)
{
    var url = BuildSearchUrl(loadCM, expansion, rarity, condition, order, text);
    var response = await _httpClient.GetAsync(url);
    return JsonConvert.DeserializeObject<IEnumerable<CardDTO>>(
        await response.Content.ReadAsStringAsync());
}
```

---

### Personalizzazioni UI

Il frontend utilizza componenti custom basati su **MetroModernUI** con tema Dark/Green:

- **MetroFormBase**: classe base per tutte le form con tema applicato
- **BorderedMetroButton**: button con bordo verde spesso (3px) per azioni primarie
- **CustomMessageBox**: dialoghi customizzati per successo, errore e conferma eliminazione

---

## Installazione e Avvio

### Prerequisiti

- Windows 10/11
- .NET Framework 4.8 Runtime
- .NET 8.0 Runtime

### Avvio tramite Installer (Produzione)

1. Eseguire `OPCM.msi` dalla cartella `OPCM-FE-Installer/OPCM/`
2. Seguire il wizard di installazione
3. Avviare **OPCM** dal desktop o dal menu Start
4. L'applicazione avviera' automaticamente il backend e aprira' la schermata principale

### Avvio in Sviluppo (Visual Studio)

1. Clonare il repository
2. Aprire `OPCM-FE.sln` in Visual Studio 2022
3. Impostare come progetto di avvio `OPCM-FE`
4. Avviare manualmente il progetto `WebApi` (il launcher automatico e' disabilitato in DEBUG)
5. Verificare che il backend sia in ascolto su `https://localhost:7212`
6. Avviare il frontend

---

## Configurazione

### Backend — `appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "User ID=...;Password=...;Server=...;Port=...;Database=opcm;"
  },
  "AllowedHosts": "*"
}
```

### Frontend — `App.config`

```xml
<configuration>
  <appSettings>
    <add key="url" value="https://localhost:7212/" />
  </appSettings>
</configuration>
```

Modificare `url` per puntare all'indirizzo del backend in produzione.

---

## Flusso Dati

### Esempio: Ricerca carte con filtri

```
1. Utente imposta filtri su CardList (Expansion + Rarity)
         |
2. CardList.cs chiama CardGateway.SearchCard(filters)
         |
3. GET https://localhost:7212/card/search?expansion=1&rarity=Super%20Rare
         |
4. CardsController riceve la richiesta e delega a CardService.GetAllSearch()
         |
5. CardService costruisce query LINQ:
   cards.Where(c => !c.Disabled && c.Expansion == 1 && c.Rarity == "Super Rare")
         |
6. BaseRepository esegue la query su DbContext (EF Core -> PostgreSQL)
         |
7. AutoMapper converte List<Card> -> List<CardDTO>
         |
8. CardsController wrappa il risultato in ResponseCreate e serializza in JSON
         |
9. CardGateway deserializza la risposta JSON -> IEnumerable<CardDTO>
         |
10. CardList popola la DataGrid con i dati ricevuti
```

---

## Design Pattern Utilizzati

### Repository Pattern
`BaseRepository<TModel, TDbContext>` fornisce un'astrazione generica sull'accesso ai dati. Utilizza **reflection** per identificare automaticamente la primary key dell'entita', rendendo il repository riutilizzabile per qualsiasi modello EF Core.

### Service Layer Pattern
La logica di business e' completamente separata dai controller. I Service si occupano di:
- Validazione delle regole di business (es. no duplicati)
- Orchestrazione di piu' chiamate al Repository
- Trasformazione dei dati tramite AutoMapper

### DTO Pattern + AutoMapper
Le entita' del database non vengono mai esposte direttamente all'esterno. I DTO (Data Transfer Objects) isolano il contratto API dal modello interno, permettendo di evolverli indipendentemente.

### Soft-Delete Pattern
Anziche' eliminare fisicamente i record, viene impostato il flag `Disabled = true`. Questo garantisce:
- Storicita' dei dati
- Possibilita' di ripristino
- Audit trail implicito

### Gateway Pattern (Frontend)
Ogni tipologia di risorsa API ha il proprio Gateway nel frontend. Questo centralizza la gestione dell'HttpClient, della serializzazione/deserializzazione JSON e della costruzione degli URL.

---

## Valori di Dominio

### Rarita' supportate

| Valore | Descrizione |
|---|---|
| `Manga Rare` | Rarita' massima, carte manga |
| `Promo` | Carte promozionali |
| `Special Rare` | Rarita' speciale |
| `Super Rare` | Rarita' molto alta |
| `Rare` | Rara |
| `Uncommon` | Non comune |
| `Common` | Comune |
| `Leader` | Carte Leader |

### Condizioni supportate

| Valore | Descrizione |
|---|---|
| `Mint` | Perfetta, mai giocata |
| `Near Mint` | Quasi perfetta, lievemente giocata |
| `Excellent` | Eccellente |
| `Good` | Buone condizioni |
| `Light Played` | Leggermente giocata |
| `Played` | Giocata |
| `Poor` | Molto usurata |

---

## Roadmap Futura

- [ ] Integrazione diretta con le API di **CardMarket** per aggiornamento prezzi automatico
- [ ] Dashboard con statistiche della collezione (valore totale, distribuzione per rarita')
- [ ] Supporto per **deck management** (costruzione e gestione mazzi)
- [ ] Notifiche per variazioni di prezzo significative
- [ ] Migrazione frontend da Windows Forms a **WPF/MAUI** per supporto cross-platform
- [ ] Autenticazione multi-utente per gestione collezioni condivise
- [ ] Export dati in CSV/Excel

---

## Autore

**Maton**
Progetto personale sviluppato per uso hobbistico e portfolio.

---

*One Piece TCG e' un marchio registrato di Bandai. Questo progetto non e' affiliato ne' sponsorizzato da Bandai o CardMarket.*
