# Vale Sánchez Fitness - Website

A modern, bilingual fitness coaching website built with Next.js 15, Payload CMS 3.0, and PostgreSQL.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.0
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Containerization**: Docker & Docker Compose
- **Language**: TypeScript

## Features

- 🌐 Bilingual support (Spanish primary)
- 📱 Fully responsive design
- 💬 WhatsApp integration for quick contact
- 📬 Contact form with email notifications
- 🖼️ CMS-managed content
- 🔐 Admin dashboard for content management
- 📊 SEO optimized with sitemap and robots.txt
- 🚀 Docker-ready for deployment

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for development database)
- pnpm (recommended) or npm

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/valesanchez.fit.git
   cd valesanchez.fit
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. **Start the development database**
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

5. **Run database migrations**
   ```bash
   pnpm payload migrate
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Access the application**
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin

### First-time Admin Setup

When you first access `/admin`, you'll be prompted to create an admin user. Use a strong password and save it securely.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URI` | PostgreSQL connection string | Yes |
| `PAYLOAD_SECRET` | Secret key for Payload CMS | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site | Yes |
| `SMTP_HOST` | SMTP server hostname | For emails |
| `SMTP_PORT` | SMTP server port | For emails |
| `SMTP_USER` | SMTP username | For emails |
| `SMTP_PASS` | SMTP password | For emails |
| `SMTP_FROM_EMAIL` | Sender email address | For emails |
| `ADMIN_EMAIL` | Admin notification email | For contact form |

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Public pages (home, about, services, etc.)
│   ├── portal/             # Customer portal (future)
│   ├── api/                # API routes
│   └── admin/              # Payload admin (auto-generated)
├── collections/            # Payload CMS collections
├── globals/                # Payload CMS globals
├── components/
│   ├── ui/                 # Base UI components
│   ├── layout/             # Layout components
│   └── sections/           # Page section components
└── lib/                    # Utilities
```

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm start            # Start production server

# Database
pnpm payload migrate  # Run migrations
pnpm generate:types   # Generate Payload types

# Linting
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix lint issues
```

## Deployment

### Using Docker (Recommended)

1. **Build and run with Docker Compose**
   ```bash
   docker compose up -d --build
   ```

2. **Run migrations inside container**
   ```bash
   docker compose exec app pnpm payload migrate
   ```

### Manual Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Set production environment variables

3. Start the server:
   ```bash
   pnpm start
   ```

### Environment-specific Notes

- **Vercel**: Works out of the box. Set up a PostgreSQL database (e.g., Neon, Supabase) and configure environment variables.
- **Railway**: Use the provided Dockerfile or Railway's Node.js buildpack.
- **DigitalOcean App Platform**: Use Docker deployment with managed PostgreSQL.

## Content Management

Access the admin panel at `/admin` to manage:

- **Pages**: Create and edit custom pages
- **Services**: Manage service offerings
- **Testimonials**: Client testimonials
- **Media**: Images and files
- **Site Settings**: Global site configuration
- **Navigation**: Header and footer links

## Customization

### Colors

Edit `tailwind.config.ts` to modify the color palette:

```ts
colors: {
  gold: {
    500: '#c9a227',  // Primary brand color
    // ...
  },
}
```

### Typography

The site uses:
- **Display**: Playfair Display (headings)
- **Body**: DM Sans (body text)

Configure fonts in `src/app/layout.tsx`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Private - All rights reserved.

## Support

For questions or support, contact:
- Email: cristian.madrigal@gmail.com
- WhatsApp: +506 8854 6547
