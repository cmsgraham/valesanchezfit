import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { getPayload } from 'payload'
import config from '@payload-config'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

// Simple rate limiting using in-memory store (use Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5

  const record = rateLimit.get(ip)

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor espera unos minutos.' },
        { status: 429 }
      )
    }

    // Parse and validate body
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message } = result.data

    // Get Payload instance
    const payload = await getPayload({ config })

    // Store submission in database
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        phone: phone || undefined,
        subject,
        message,
        status: 'new',
        metadata: {
          ipAddress: ip,
          userAgent: request.headers.get('user-agent') || undefined,
          source: 'contact-form',
        },
      },
    })

    // Send email notification
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      const adminEmail = process.env.ADMIN_EMAIL || 'cristian.madrigal@gmail.com'

      // Send notification to admin
      await transporter.sendMail({
        from: `"Vale Sánchez Fitness" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `Nuevo mensaje: ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #c9a227;">Nuevo mensaje de contacto</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Nombre:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Teléfono:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Asunto:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
              <p style="color: #555; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; color: #888; font-size: 12px;">
              Este mensaje fue enviado desde el formulario de contacto de valesanchez.fit
            </p>
          </div>
        `,
      })

      // Send confirmation to user
      await transporter.sendMail({
        from: `"Vale Sánchez Fitness" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: email,
        subject: '¡Gracias por tu mensaje!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #c9a227;">¡Hola ${name}!</h2>
            <p>Gracias por contactarme. He recibido tu mensaje y te responderé lo antes posible.</p>
            <p>Si tienes alguna pregunta urgente, puedes contactarme directamente por WhatsApp:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/50688546547" 
                 style="display: inline-block; padding: 12px 24px; background-color: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Chatear por WhatsApp
              </a>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="color: #888; font-size: 12px;">
              Este es un mensaje automático. Por favor no respondas a este correo.
            </p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
