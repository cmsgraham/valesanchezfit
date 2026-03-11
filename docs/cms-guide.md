# CMS Content Guide — Vale Sánchez Fitness

Everything visible on the public site is managed through the **Payload CMS admin** at `/admin`.

---

## Admin Structure

### Pages (Globals)
Globals control full page content. Found under **Pages** in the left sidebar.

| Global | URL | Controls |
|--------|-----|---------|
| **Home Page** | `/admin/globals/home-page` | Hero, Value Proposition, About Preview, Services Section settings, Testimonials Section settings, CTA section |
| **About Page** | `/admin/globals/about-page` | Hero, Bio (rich text), Credentials list, Values list, SEO |
| **Services Page** | `/admin/globals/services-page` | Hero, FAQ list, CTA, SEO |
| **Contact Settings** | `/admin/globals/contact-settings` | WhatsApp number, email, address, business hours, contact form text |

### Collections
Collections are lists of repeatable content items.

| Collection | URL | Controls |
|------------|-----|---------|
| **Services** | `/admin/collections/services` | Individual service cards (title, description, icon, features, pricing, order) |
| **Testimonials** | `/admin/collections/testimonials` | Client testimonials (name, role, quote, rating, photo) |
| **Achievements** | `/admin/collections/achievements` | Stats/milestones shown on the site |
| **Media** | `/admin/collections/media` | All uploaded images and videos |
| **Pages** | `/admin/collections/pages` | Generic standalone pages (unused slots for future content) |
| **Contact Submissions** | `/admin/collections/contact-submissions` | Inbox for contact form messages |

### Settings (Globals)
Found under **Settings** in the left sidebar.

| Global | URL | Controls |
|--------|-----|---------|
| **Site Settings** | `/admin/globals/site-settings` | Site name, default SEO meta title/description, social links |
| **Header** | `/admin/globals/header` | Navigation items, CTA button |
| **Footer** | `/admin/globals/footer` | Footer tagline, columns, legal links, copyright text |

---

## Page-by-Page Reference

### Home Page (`/`)
- **Hero**: title, subtitle, background image/video, CTA buttons → `Home Page > Hero`
- **Value Proposition** cards → `Home Page > Value Proposition`
- **About Preview** (heading, content, stats, image) → `Home Page > About Preview`
- **Services section** heading — `Home Page > Services`; individual services → `Collections > Services`
- **Testimonials section** heading — `Home Page > Testimonials`; individual testimonials → `Collections > Testimonials`
- **CTA section** at the bottom → `Home Page > CTA`
- **SEO** (meta title, description) → `Site Settings > SEO`

### About Page (`/about`)
- **Hero** (title, subtitle, image) → `About Page > Hero`
- **Bio text** (rich text editor) → `About Page > Main Content`
- **Credentials & Certifications** list → `About Page > Credentials`
- **Values** cards → `About Page > Mission & Values`
- **CTA at the bottom** → `About Page` (uses global defaultValue or Home Page CTA)
- **SEO** → `About Page > SEO`

### Services Page (`/services`)
- **Hero** (title, subtitle, badge) → `Services Page > Hero`
- **Service cards** (each card's title, description, icon, features, pricing, CTA button) → `Collections > Services`
  - Set **order** (number) to control display sequence
  - Check **Featured** to highlight a service with the gold "Más Popular" badge
  - Set **status** to `published` to show it, `draft` to hide it
- **FAQ section** → `Services Page > FAQ`
- **CTA section** at the bottom → `Services Page > CTA`
- **SEO** → `Services Page > SEO`

### Contact Page (`/contact`)
- All contact info (WhatsApp, email, address, hours) → `Contact Settings`
- Form heading and success message → `Contact Settings > Contact Page`
- Hero title and subtitle → `Contact Settings > Contact Page`

### Privacy Policy & Terms (`/privacy-policy`, `/terms`)
- Contact email and WhatsApp displayed at the bottom pull from `Contact Settings`
- The legal text itself is static (not CMS-managed). To make it editable, a `Pages` collection entry or dedicated global would need to be created.

---

## Design & Styling

These are **code files**, not CMS — a developer needs to edit them.

| What | Where |
|------|-------|
| **Fonts** | `src/app/(public)/layout.tsx` — imports `DM_Sans` (body) and `Playfair_Display` (headings) from Google Fonts |
| **Brand colors** | `tailwind.config.ts` — `gold` palette (accent) and `warm` palette (neutrals/text) |
| **CSS variables** (buttons, inputs, cards) | `src/app/globals.css` — `--primary`, `--background`, `--border`, etc. (HSL format) |
| **Spacing utilities** | `src/app/globals.css` — `.container-custom` (max width/padding) and `.section-padding` (vertical rhythm) |
| **Border radius** | `src/app/globals.css` — `--radius` variable |

---

## Seed Scripts

Located in `/scripts/`. Run with:

```bash
npx tsx --env-file=.env scripts/<script>.ts
```

| Script | Purpose |
|--------|---------|
| `seed-services.ts` | Creates/updates the 6 default services in the database |
| `seed-about.ts` | Populates the About Page global (bio, credentials, values) |

---

## Adding New Content Types

1. Create a new collection in `src/collections/` or global in `src/globals/`
2. Register it in `src/payload.config.ts`
3. Run `pnpm generate:types` to update TypeScript types
4. Use it in the relevant page under `src/app/(public)/`
