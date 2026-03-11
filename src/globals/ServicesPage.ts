import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
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
              localized: true,
              defaultValue: 'Servicios de Entrenamiento',
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              localized: true,
              defaultValue: 'Encuentra el servicio perfecto para tus objetivos y estilo de vida',
            },
            {
              name: 'heroBadge',
              type: 'text',
              localized: true,
              defaultValue: 'Servicios',
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faqHeading',
              type: 'text',
              localized: true,
              defaultValue: 'Preguntas Frecuentes',
            },
            {
              name: 'faqSubheading',
              type: 'text',
              localized: true,
              defaultValue: 'Respuestas a las dudas más comunes sobre mis servicios.',
            },
            {
              name: 'faqItems',
              type: 'array',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'ctaHeading',
              type: 'text',
              localized: true,
              defaultValue: '¿No encuentras lo que buscas?',
            },
            {
              name: 'ctaSubheading',
              type: 'text',
              localized: true,
              defaultValue: 'Escríbeme y juntos diseñamos un plan perfecto para tus necesidades específicas.',
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
                  defaultValue: 'Servicios de Entrenamiento Personal',
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  defaultValue: 'Descubre nuestros servicios de entrenamiento personal, coaching en línea, planes de nutrición y más.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
