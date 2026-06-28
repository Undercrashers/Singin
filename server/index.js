import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { processBooking } from './booking.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: true }))
app.use(express.json({ limit: '16kb' }))

app.post('/api/bookings', async (req, res) => {
  const result = await processBooking(req.body)
  return res.status(result.status).json(result.body)
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  const smtpReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  console.log(`Singin API running on http://localhost:${PORT}`)
  if (smtpReady) {
    console.log('SMTP configured — booking emails will be sent.')
  } else {
    console.log('SMTP NOT configured — bookings work, but no emails are sent.')
    console.log('Create a .env file from .env.example and add your SMTP credentials.')
  }
})
