import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: 'Promoviendo estilos de vida saludables a través del Fitness!',
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              localized: true,
              defaultValue: 'Empecemos a trabajarlo juntos',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'heroBackgroundVideo',
              type: 'text',
              admin: {
                description: 'YouTube or Vimeo embed URL for background video',
              },
            },
            {
              name: 'heroCta',
              type: 'group',
              fields: [
                {
                  name: 'primaryButton',
                  type: 'group',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'Reserva tu Espacio',
                      localized: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                      defaultValue: '/contact',
                    },
                  ],
                },
                {
                  name: 'secondaryButton',
                  type: 'group',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'Ver Servicios',
                      localized: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                      defaultValue: '/services',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Value Proposition',
          fields: [
            {
              name: 'valueProposition',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Tu Transformación Comienza Aquí',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'highlights',
                  type: 'array',
                  maxRows: 4,
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      options: [
                        { label: 'Target', value: 'target' },
                        { label: 'Heart', value: 'heart' },
                        { label: 'Trophy', value: 'trophy' },
                        { label: 'Users', value: 'users' },
                        { label: 'Calendar', value: 'calendar' },
                        { label: 'Trending Up', value: 'trending-up' },
                      ],
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      localized: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'About Preview',
          fields: [
            {
              name: 'aboutPreview',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Conoce a Vale Sánchez',
                },
                {
                  name: 'content',
                  type: 'richText',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'stats',
                  type: 'array',
                  maxRows: 4,
                  fields: [
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                  ],
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  defaultValue: 'Conocer más',
                  localized: true,
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  defaultValue: '/about',
                },
              ],
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'servicesSection',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Nuestros Servicios',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'showFeaturedOnly',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'maxServices',
                  type: 'number',
                  defaultValue: 6,
                  min: 2,
                  max: 12,
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  defaultValue: 'Ver todos los servicios',
                  localized: true,
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  defaultValue: '/services',
                },
              ],
            },
          ],
        },
        {
          label: 'Why Choose Us',
          fields: [
            {
              name: 'whyChooseUs',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: '¿Por qué elegirnos?',
                },
                {
                  name: 'reasons',
                  type: 'array',
                  maxRows: 6,
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      options: [
                        { label: 'Check Circle', value: 'check-circle' },
                        { label: 'Shield', value: 'shield' },
                        { label: 'Star', value: 'star' },
                        { label: 'Clock', value: 'clock' },
                        { label: 'Zap', value: 'zap' },
                        { label: 'Award', value: 'award' },
                      ],
                    },
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      localized: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Achievements',
          fields: [
            {
              name: 'achievementsSection',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Logros y Certificaciones',
                },
                {
                  name: 'showFeaturedOnly',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Testimonials',
          fields: [
            {
              name: 'testimonialsSection',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Lo que dicen nuestros clientes',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'showFeaturedOnly',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'maxTestimonials',
                  type: 'number',
                  defaultValue: 6,
                  min: 2,
                  max: 12,
                },
              ],
            },
          ],
        },
        {
          label: 'Contact CTA',
          fields: [
            {
              name: 'contactCta',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: '¿Listo para comenzar tu transformación?',
                },
                {
                  name: 'subheading',
                  type: 'textarea',
                  localized: true,
                  defaultValue: 'Contáctanos hoy y da el primer paso hacia una vida más saludable.',
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'primaryButton',
                  type: 'group',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'Contáctanos',
                      localized: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                      defaultValue: '/contact',
                    },
                  ],
                },
                {
                  name: 'whatsappButton',
                  type: 'group',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                    {
                      name: 'text',
                      type: 'text',
                      defaultValue: 'WhatsApp',
                      localized: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  defaultValue: 'Vale Sánchez Fitness - Personal Trainer',
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  defaultValue: 'Entrenamiento fitness personalizado. Transforma tu vida con programas diseñados especialmente para ti.',
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
