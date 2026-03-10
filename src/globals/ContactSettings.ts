import type { GlobalConfig } from 'payload'

export const ContactSettings: GlobalConfig = {
  slug: 'contact-settings',
  label: 'Contact Settings',
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
          label: 'WhatsApp',
          fields: [
            {
              name: 'whatsapp',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'phoneNumber',
                  type: 'text',
                  required: true,
                  defaultValue: '50688546547',
                  admin: {
                    description: 'WhatsApp number with country code (no + or spaces)',
                  },
                },
                {
                  name: 'defaultMessage',
                  type: 'textarea',
                  localized: true,
                  defaultValue: 'Hola! Me interesa saber más sobre los servicios de entrenamiento personal.',
                },
                {
                  name: 'floatingButton',
                  type: 'group',
                  fields: [
                    {
                      name: 'enabled',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                    {
                      name: 'position',
                      type: 'select',
                      defaultValue: 'bottom-right',
                      options: [
                        { label: 'Bottom Right', value: 'bottom-right' },
                        { label: 'Bottom Left', value: 'bottom-left' },
                      ],
                    },
                    {
                      name: 'showOnMobile',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Email',
          fields: [
            {
              name: 'email',
              type: 'group',
              fields: [
                {
                  name: 'contactEmail',
                  type: 'email',
                  required: true,
                  defaultValue: 'cristian.madrigal@gmail.com',
                  admin: {
                    description: 'Email address to receive contact form submissions',
                  },
                },
                {
                  name: 'notifyOnSubmission',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'sendConfirmation',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: {
                    description: 'Send confirmation email to the person who submitted the form',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'location',
              type: 'group',
              fields: [
                {
                  name: 'showMap',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'address',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'googleMapsUrl',
                  type: 'text',
                  admin: {
                    description: 'Google Maps embed URL for the location',
                  },
                },
                {
                  name: 'coordinates',
                  type: 'group',
                  fields: [
                    {
                      name: 'lat',
                      type: 'number',
                    },
                    {
                      name: 'lng',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Business Hours',
          fields: [
            {
              name: 'businessHours',
              type: 'group',
              fields: [
                {
                  name: 'showHours',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'timezone',
                  type: 'text',
                  defaultValue: 'America/Costa_Rica',
                },
                {
                  name: 'hours',
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
                    {
                      name: 'closed',
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
          label: 'Contact Page',
          fields: [
            {
              name: 'contactPage',
              type: 'group',
              fields: [
                {
                  name: 'heroTitle',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Contáctanos',
                },
                {
                  name: 'heroSubtitle',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Estamos aquí para ayudarte a alcanzar tus metas',
                },
                {
                  name: 'formHeading',
                  type: 'text',
                  localized: true,
                  defaultValue: 'Envíanos un mensaje',
                },
                {
                  name: 'successMessage',
                  type: 'textarea',
                  localized: true,
                  defaultValue: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
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
                  defaultValue: 'Contacto - Vale Sánchez Fitness',
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  defaultValue: 'Contáctanos para comenzar tu transformación. WhatsApp, email o visítanos.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
