import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
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
              defaultValue: 'Sobre Vale Sánchez',
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              localized: true,
              defaultValue: 'Conoce mi historia y pasión por el fitness',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Main Content',
          fields: [
            {
              name: 'mainContent',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Mi Historia',
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
              ],
            },
          ],
        },
        {
          label: 'Credentials',
          fields: [
            {
              name: 'credentials',
              type: 'group',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Credenciales y Certificaciones',
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'institution',
                      type: 'text',
                    },
                    {
                      name: 'year',
                      type: 'number',
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Mission & Values',
          fields: [
            {
              name: 'missionValues',
              type: 'group',
              fields: [
                {
                  name: 'missionHeading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Mi Misión',
                },
                {
                  name: 'missionContent',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'valuesHeading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Mis Valores',
                },
                {
                  name: 'values',
                  type: 'array',
                  fields: [
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
                    {
                      name: 'icon',
                      type: 'select',
                      options: [
                        { label: 'Heart', value: 'heart' },
                        { label: 'Star', value: 'star' },
                        { label: 'Shield', value: 'shield' },
                        { label: 'Users', value: 'users' },
                        { label: 'Target', value: 'target' },
                        { label: 'Trending Up', value: 'trending-up' },
                      ],
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
                  defaultValue: 'Sobre Vale Sánchez - Personal Trainer',
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  defaultValue: 'Conoce a Vale Sánchez, personal trainer certificada dedicada a transformar vidas a través del fitness.',
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
