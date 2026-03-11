import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react'

const DEFAULT_COLUMNS = [
  {
    title: 'Servicios',
    links: [
      { label: 'Entrenamiento Personal', href: '/services', newTab: false },
      { label: 'Coaching Online', href: '/services', newTab: false },
      { label: 'Clases Grupales', href: '/services', newTab: false },
      { label: 'Asesoría Nutricional', href: '/services', newTab: false },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Mí', href: '/about', newTab: false },
      { label: 'Servicios', href: '/services', newTab: false },
      { label: 'Testimonios', href: '/#testimonials', newTab: false },
      { label: 'Contacto', href: '/contact', newTab: false },
    ],
  },
]

const DEFAULT_LEGAL_LINKS = [
  { label: 'Política de Privacidad', href: '/privacy-policy' },
  { label: 'Términos de Servicio', href: '/terms' },
]

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
}

interface FooterProps {
  data?: {
    tagline?: string | null
    columns?: { title: string; links?: { label: string; link: string; newTab?: boolean | null }[] | null; id?: string | null }[] | null
    phone?: string | null
    email?: string | null
    address?: string | null
    schedule?: { days: string; hours: string; id?: string | null }[] | null
    copyrightText?: string | null
    legalLinks?: { label: string; link: string; id?: string | null }[] | null
  } | null
  siteData?: {
    socialLinks?: { platform: string; url: string; id?: string | null }[] | null
  } | null
  contactData?: {
    whatsapp?: { phoneNumber?: string | null } | null
    email?: { contactEmail?: string | null } | null
    location?: { address?: string | null; googleMapsUrl?: string | null } | null
    businessHours?: { hours?: { days: string; hours: string; id?: string | null }[] | null } | null
  } | null
}

export function Footer({ data, siteData, contactData }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const columns = data?.columns?.length
    ? data.columns.map(col => ({
        title: col.title,
        links: col.links?.map(l => ({ label: l.label, href: l.link, newTab: l.newTab ?? false })) ?? [],
      }))
    : DEFAULT_COLUMNS

  const tagline = data?.tagline ?? 'Transformando vidas a través del fitness personalizado. Tu bienestar es mi prioridad.'

  const footerPhone = data?.phone
    ?? (contactData?.whatsapp?.phoneNumber ? `+${contactData.whatsapp.phoneNumber}` : '+506 8854 6547')
  const footerPhoneHref = contactData?.whatsapp?.phoneNumber
    ? `https://wa.me/${contactData.whatsapp.phoneNumber}`
    : 'https://wa.me/50688546547'

  const footerEmail = data?.email ?? contactData?.email?.contactEmail ?? 'info@valesanchez.fit'
  const footerAddress = data?.address ?? contactData?.location?.address ?? 'Costa Rica'
  const schedule = data?.schedule?.length
    ? data.schedule
    : contactData?.businessHours?.hours?.length
      ? contactData.businessHours.hours
      : [{ days: 'Lun - Vie', hours: '6:00 - 20:00' }, { days: 'Sáb', hours: '7:00 - 14:00' }]

  const legalLinks = data?.legalLinks?.length
    ? data.legalLinks.map(l => ({ label: l.label, href: l.link }))
    : DEFAULT_LEGAL_LINKS

  const socialLinks = siteData?.socialLinks?.length
    ? siteData.socialLinks
    : [
        { platform: 'instagram', url: 'https://instagram.com/valesanchez.fit' },
        { platform: 'facebook', url: 'https://facebook.com' },
      ]

  const copyright = data?.copyrightText
    ? data.copyrightText.replace('{year}', currentYear.toString())
    : `© ${currentYear} Vale Sánchez Fitness. Todos los derechos reservados.`

  return (
    <footer className="bg-warm-900 text-warm-100">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-bold text-white">
                vale<span className="text-gold-400">sánchez</span>.fit
              </span>
            </Link>
            <p className="text-warm-300 text-sm leading-relaxed mb-6">
              {tagline}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = SOCIAL_ICON_MAP[social.platform] ?? ExternalLink
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-warm-800 flex items-center justify-center hover:bg-gold-500 transition-colors"
                    aria-label={social.platform}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Dynamic Columns */}
          {columns.map((col, colIndex) => (
            <div key={colIndex}>
              <h4 className="font-display text-lg font-semibold text-white mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.newTab ? 'noopener noreferrer' : undefined}
                      className="text-warm-300 hover:text-gold-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={footerPhoneHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-300 hover:text-gold-400 transition-colors text-sm"
                  >
                    {footerPhone}
                  </a>
                  <p className="text-warm-400 text-xs mt-1">WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${footerEmail}`}
                  className="text-warm-300 hover:text-gold-400 transition-colors text-sm"
                >
                  {footerEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-warm-300 text-sm">
                  {footerAddress}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="text-warm-300 text-sm">
                  {schedule.map((s, i) => (
                    <p key={i}>{s.days}: {s.hours}</p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-warm-400 text-sm">
              {copyright}
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-warm-400 hover:text-gold-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
