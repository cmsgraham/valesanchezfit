import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              defaultValue: 'Transformando vidas a través del fitness',
            },
            {
              name: 'columns',
              type: 'array',
              maxRows: 4,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'newTab',
                      type: 'checkbox',
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'address',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'email',
              type: 'email',
            },
            {
              name: 'schedule',
              type: 'array',
              fields: [
                {
                  name: 'days',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'hours',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Legal',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              localized: true,
              defaultValue: '© {year} Vale Sánchez Fitness. Todos los derechos reservados.',
            },
            {
              name: 'legalLinks',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
