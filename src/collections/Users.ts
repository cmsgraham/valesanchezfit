import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    description: 'User accounts for CMS access and future portal users',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
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
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Trainer', value: 'trainer' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'phone',
      type: 'text',
    },
    // Fields for future portal functionality
    {
      name: 'portalAccess',
      type: 'group',
      admin: {
        description: 'Future customer portal settings',
      },
      fields: [
        {
          name: 'hasPortalAccess',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'assignedTrainer',
          type: 'relationship',
          relationTo: 'users',
          filterOptions: {
            role: { equals: 'trainer' },
          },
        },
      ],
    },
  ],
}
