const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function validateBooking(body) {
  const { name, email, date, time, guests, restaurantName } = body ?? {}

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
    return 'Please enter a valid full name.'
  }
  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
    return 'Please enter a valid email address.'
  }
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return 'Please select a valid date.'
  }
  if (typeof time !== 'string' || !/^\d{2}:\d{2}$/.test(time)) {
    return 'Please select a valid time.'
  }
  if (typeof guests !== 'string' || guests.trim().length === 0) {
    return 'Please select the number of guests.'
  }
  if (typeof restaurantName !== 'string' || restaurantName.trim().length === 0) {
    return 'Restaurant name is required.'
  }

  return null
}

function createTransporter(nodemailer) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function processBooking(body) {
  const validationError = validateBooking(body)
  if (validationError) {
    return { status: 400, body: { success: false, message: validationError } }
  }

  const name = body.name.trim()
  const email = body.email.trim()
  const date = body.date.trim()
  const time = body.time.trim()
  const guests = body.guests.trim()
  const restaurantName = body.restaurantName.trim()

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    date: escapeHtml(date),
    time: escapeHtml(time),
    guests: escapeHtml(guests),
    restaurantName: escapeHtml(restaurantName),
  }

  const nodemailer = await import('nodemailer')
  const transporter = createTransporter(nodemailer.default)

  if (!transporter) {
    return {
      status: 200,
      body: {
        success: true,
        dev: true,
        message: 'Booking saved locally. Configure SMTP in .env to send confirmation emails.',
      },
    }
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: email,
      subject: `Your reservation at ${restaurantName} is finalized — Singin`,
      text: [
        `Hi ${name},`,
        '',
        `Your reservation at ${restaurantName} is finalized.`,
        '',
        `Date: ${date}`,
        `Time: ${time}`,
        `Guests: ${guests}`,
        '',
        'We look forward to hosting you.',
        '',
        '— Singin Group',
      ].join('\n'),
      html: `
        <div style="font-family: Georgia, serif; color: #1A1A1A; max-width: 520px; margin: 0 auto; padding: 32px;">
          <p style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px; color: #B06D5B;">Singin</p>
          <h1 style="font-size: 24px; font-weight: normal; text-transform: uppercase;">Reservation Finalized</h1>
          <p style="font-family: Arial, sans-serif; line-height: 1.6;">Hi ${safe.name},</p>
          <p style="font-family: Arial, sans-serif; line-height: 1.6;">
            Your reservation at <strong>${safe.restaurantName}</strong> is confirmed and finalized.
          </p>
          <table style="font-family: Arial, sans-serif; width: 100%; border-collapse: collapse; margin: 24px 0;">
            <tr><td style="padding: 8px 0; color: #8A9A86;">Date</td><td style="padding: 8px 0;">${safe.date}</td></tr>
            <tr><td style="padding: 8px 0; color: #8A9A86;">Time</td><td style="padding: 8px 0;">${safe.time}</td></tr>
            <tr><td style="padding: 8px 0; color: #8A9A86;">Guests</td><td style="padding: 8px 0;">${safe.guests}</td></tr>
          </table>
          <p style="font-family: Arial, sans-serif; line-height: 1.6;">We look forward to hosting you.</p>
          <p style="font-family: Arial, sans-serif; font-size: 12px; color: #8A9A86; margin-top: 32px;">© Singin Group · Wollongong</p>
        </div>
      `,
    })

    return { status: 200, body: { success: true } }
  } catch (err) {
    console.error('Failed to send booking email:', err.message)
    return {
      status: 500,
      body: {
        success: false,
        message: 'Could not send confirmation email. Please try again.',
      },
    }
  }
}
