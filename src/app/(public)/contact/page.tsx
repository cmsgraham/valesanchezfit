'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'El asunto debe tener al menos 3 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: Phone,
    title: 'WhatsApp',
    value: '+506 8854 6547',
    href: 'https://wa.me/50688546547',
    description: 'Respuesta rápida',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'cristian.madrigal@gmail.com',
    href: 'mailto:cristian.madrigal@gmail.com',
    description: 'Para consultas detalladas',
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    value: 'San José, Costa Rica',
    href: 'https://maps.google.com/?q=San+Jose+Costa+Rica',
    description: 'Sesiones presenciales',
  },
  {
    icon: Clock,
    title: 'Horario',
    value: 'Lun - Vie: 6am - 8pm',
    href: undefined,
    description: 'Sábados: 7am - 12pm',
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setError(null)
    
    startTransition(() => {
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (!response.ok) {
            const result = await response.json()
            throw new Error(result.error || 'Error al enviar el mensaje')
          }
          setIsSubmitted(true)
          reset()
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : 'Error al enviar el mensaje')
        })
    })
  }

  const whatsappNumber = '50688546547'
  const whatsappMessage = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre tus servicios.')

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-warm-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-4">
              Contacto
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-warm-900 mb-6">
              Hablemos
            </h1>
            <p className="text-lg text-warm-600">
              Estoy aquí para responder tus preguntas y ayudarte a comenzar tu transformación
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-warm-900 mb-6">
                Información de Contacto
              </h2>
              <p className="text-warm-600 mb-8">
                La forma más rápida de comunicarte conmigo es por WhatsApp. 
                También puedes enviarme un email o llenar el formulario.
              </p>

              <div className="space-y-4 mb-10">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 bg-warm-50">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-gold-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-warm-900">{info.title}</h3>
                        {info.href ? (
                          <a 
                            href={info.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gold-600 hover:text-gold-700 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-warm-900">{info.value}</p>
                        )}
                        <p className="text-sm text-warm-600">{info.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="p-6 bg-[#25D366]/10 rounded-2xl border border-[#25D366]/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-900 mb-1">
                      ¿Prefieres WhatsApp?
                    </h3>
                    <p className="text-sm text-warm-600 mb-4">
                      Escríbeme directamente y te respondo en minutos.
                    </p>
                    <Button asChild variant="whatsapp">
                      <a 
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chatear por WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-warm-900 mb-3">
                        ¡Mensaje Enviado!
                      </h3>
                      <p className="text-warm-600 mb-6">
                        Gracias por contactarme. Te responderé lo antes posible.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        Enviar otro mensaje
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-bold text-warm-900 mb-2">
                        Envíame un Mensaje
                      </h2>
                      <p className="text-warm-600 mb-8">
                        Completa el formulario y me pondré en contacto contigo pronto.
                      </p>

                      {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nombre *</Label>
                            <Input
                              id="name"
                              placeholder="Tu nombre"
                              {...register('name')}
                              className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="tu@email.com"
                              {...register('email')}
                              className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                              id="phone"
                              placeholder="+506 0000 0000"
                              {...register('phone')}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Asunto *</Label>
                            <Input
                              id="subject"
                              placeholder="¿En qué puedo ayudarte?"
                              {...register('subject')}
                              className={errors.subject ? 'border-red-500' : ''}
                            />
                            {errors.subject && (
                              <p className="text-red-500 text-sm">{errors.subject.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Mensaje *</Label>
                          <Textarea
                            id="message"
                            rows={5}
                            placeholder="Cuéntame más sobre tus objetivos y cómo puedo ayudarte..."
                            {...register('message')}
                            className={errors.message ? 'border-red-500' : ''}
                          />
                          {errors.message && (
                            <p className="text-red-500 text-sm">{errors.message.message}</p>
                          )}
                        </div>

                        <Button 
                          type="submit" 
                          variant="gold"
                          className="w-full"
                          disabled={isPending}
                        >
                          {isPending ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Enviar Mensaje
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
