import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
    defaultColumns: ['name', 'email', 'service', 'status', 'createdAt'],
    description: 'Contact form submissions from the website',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Public can submit
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'service',
      type: 'select',
      options: [
        { label: 'Personal Training', value: 'personal-training' },
        { label: 'Exercise Plans', value: 'exercise-plans' },
        { label: 'Virtual Classes', value: 'virtual-classes' },
        { label: 'Group Training', value: 'group-training' },
        { label: 'App Training', value: 'app-training' },
        { label: 'General Inquiry', value: 'general' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Responded', value: 'responded' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes about this submission',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      admin: {
        condition: () => false, // Hide from UI
      },
      fields: [
        {
          name: 'ipAddress',
          type: 'text',
        },
        {
          name: 'userAgent',
          type: 'text',
        },
        {
          name: 'honeypot',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Sanitize data
        if (data?.name) data.name = data.name.trim()
        if (data?.email) data.email = data.email.toLowerCase().trim()
        if (data?.message) data.message = data.message.trim()
        return data
      },
    ],
  },
}
