import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'order', 'featured', 'status'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Brief description for service cards',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Dumbbell', value: 'dumbbell' },
        { label: 'Users', value: 'users' },
        { label: 'Calendar', value: 'calendar' },
        { label: 'Smartphone', value: 'smartphone' },
        { label: 'Target', value: 'target' },
        { label: 'Trophy', value: 'trophy' },
        { label: 'Heart', value: 'heart' },
        { label: 'Activity', value: 'activity' },
        { label: 'Video', value: 'video' },
        { label: 'Star', value: 'star' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'showPricing',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'price',
          type: 'number',
          admin: {
            condition: (_, siblingData) => siblingData?.showPricing,
          },
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
          admin: {
            condition: (_, siblingData) => siblingData?.showPricing,
          },
        },
        {
          name: 'period',
          type: 'select',
          options: [
            { label: 'Per Session', value: 'session' },
            { label: 'Per Month', value: 'month' },
            { label: 'Per Package', value: 'package' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.showPricing,
          },
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Más información',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this service prominently on homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order (lower numbers first)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
