import { processBooking } from '../server/booking.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const result = await processBooking(req.body)
  return res.status(result.status).json(result.body)
}
