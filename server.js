import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { execFile } from 'child_process'
import { fileURLToPath } from 'url'
import { promisify } from 'util'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.SERVER_PORT || 4307
const NODE_ENV = process.env.NODE_ENV || 'development'
const execFileAsync = promisify(execFile)

// Middleware
app.use(express.json({ limit: '10kb' }))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4321',
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

// Rate limiting map (simple in-memory)
const requestMap = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3 // max 3 requests per minute per IP

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message)
  } else {
    console.log('✅ Email transporter ready')
  }
})

// Helper: Sanitize input
function sanitizeInput(text) {
  return String(text)
    .replace(/[<>]/g, '')
    .trim()
}

// Helper: Validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper: Rate limiting
function checkRateLimit(ip) {
  const now = Date.now()
  if (!requestMap.has(ip)) {
    requestMap.set(ip, [])
  }

  const timestamps = requestMap.get(ip)
  const recentRequests = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  recentRequests.push(now)
  requestMap.set(ip, recentRequests)
  return true
}

// Helper: Save contact log
function saveContactLog(data) {
  const logsDir = path.join(__dirname, 'logs')
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true })
  }

  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    ...data,
  }

  const logFile = path.join(logsDir, `contacts_${new Date().toISOString().split('T')[0]}.json`)
  let logs = []

  if (fs.existsSync(logFile)) {
    logs = JSON.parse(fs.readFileSync(logFile, 'utf-8'))
  }

  logs.push(logEntry)
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2))
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

async function getLatestCommitDate() {
  try {
    const { stdout } = await execFileAsync(
      'git',
      ['log', '-1', '--date=format:%Y.%m.%d.%H:%M', '--format=%cd'],
      { cwd: __dirname }
    )

    return stdout.trim()
  } catch (error) {
    console.error('❌ Failed to read latest git commit date:', error.message)
    return null
  }
}

app.get('/api/repo-info', async (req, res) => {
  const lastCommitDate = await getLatestCommitDate()

  if (!lastCommitDate) {
    return res.status(500).json({ error: 'Unable to read repository metadata' })
  }

  return res.json({
    lastCommitDate,
  })
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress
    const { name, email, subject, message, honeypot } = req.body

    // Honeypot check (anti-spam)
    if (honeypot) {
      console.warn(`⚠️  Honeypot triggered from IP: ${ip}`)
      return res.status(400).json({ error: 'Invalid submission' })
    }

    // Rate limiting
    if (!checkRateLimit(ip)) {
      console.warn(`⚠️  Rate limit exceeded from IP: ${ip}`)
      return res.status(429).json({ error: 'Too many requests. Please try again later.' })
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: 'Name must be between 2 and 100 characters' })
    }

    if (message.length < 10 || message.length > 5000) {
      return res.status(400).json({ error: 'Message must be between 10 and 5000 characters' })
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedSubject = sanitizeInput(subject)
    const sanitizedMessage = sanitizeInput(message)

    // Email HTML template
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p><strong>From:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <h3>Message:</h3>
        <p style="white-space: pre-wrap; word-wrap: break-word; color: #555;">
          ${sanitizedMessage}
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #888;">
          Sent at: ${new Date().toISOString()}<br>
          IP: ${ip}
        </p>
      </div>
    `

    // Send email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_TO,
      replyTo: sanitizedEmail,
      subject: `[Portfolio Contact] ${sanitizedSubject}`,
      html: htmlTemplate,
      text: `From: ${sanitizedName}\nEmail: ${sanitizedEmail}\nSubject: ${sanitizedSubject}\n\n${sanitizedMessage}`,
    }

    // Also send confirmation to user
    const confirmationTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333;">Grazie per avermi contattato</h2>
        <p>Ciao ${sanitizedName},</p>
        <p>Ho ricevuto il tuo messaggio e ti risponderò al più presto (entro 24h).</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <h4>Riepilogo del tuo messaggio:</h4>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <p style="white-space: pre-wrap; word-wrap: break-word; color: #555;">
          ${sanitizedMessage}
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #888; font-size: 12px;">
          Se non hai inviato tu questo modulo, ignora questo messaggio.
        </p>
      </div>
    `

    const confirmationOptions = {
      from: process.env.GMAIL_USER,
      to: sanitizedEmail,
      subject: 'Confermato: Ho ricevuto il tuo messaggio 🚀',
      html: confirmationTemplate,
      text: `Grazie ${sanitizedName},\n\nHo ricevuto il tuo messaggio: "${sanitizedSubject}"\n\nTi risponderò entro 24h!`,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(confirmationOptions),
    ])

    // Save to log
    saveContactLog({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      messageLength: sanitizedMessage.length,
      ip,
      status: 'sent',
    })

    console.log(`✅ Contact form submitted by ${sanitizedName} (${sanitizedEmail})`)

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully! Check your inbox for confirmation.',
    })
  } catch (error) {
    console.error('❌ Contact form error:', error.message)

    // Save failed attempt
    saveContactLog({
      name: req.body?.name,
      email: req.body?.email,
      subject: req.body?.subject,
      ip: req.ip,
      status: 'failed',
      error: error.message,
    })

    return res.status(500).json({
      error: 'An error occurred while processing your request. Please try again later.',
      ...(NODE_ENV === 'development' && { debug: error.message }),
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Contact Form Server running on port ${PORT}`)
  console.log(`📧 Email: ${process.env.GMAIL_USER}`)
  console.log(`🌍 CORS Origin: ${process.env.CORS_ORIGIN}`)
  console.log(`🔧 Environment: ${NODE_ENV}\n`)
})

