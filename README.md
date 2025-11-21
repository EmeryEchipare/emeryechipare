# Emery Echipare Art Portfolio Website

A professional art portfolio and e-commerce website for artist Emery Echipare, built with Next.js and deployed on Cloudflare Pages.

## Project Information

- **Domain:** emeryechipare.com (purchased through Cloudflare)
- **Live URL:** https://emeryechipare.com ✅ LIVE
- **Alt URLs:** https://emeryechipare.pages.dev | https://43520584.emeryechipare.pages.dev
- **Repository:** https://github.com/EmeryEchipare/emeryechipare
- **Technology:** Next.js 16.0.3, React, Tailwind CSS, TypeScript
- **Hosting:** Cloudflare Pages

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Visit http://localhost:3000

# Build for production (creates static export in 'out/' directory)
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=emeryechipare-art --branch=main
```

## Project Status

### Completed ✅
**Phase 1-7: Foundation & Content (Nov 20, 2025)**
- Development environment setup (Git, Node.js, Wrangler CLI)
- GitHub repository and account configured
- Four-page website structure
- Cloudflare Pages deployment
- Custom domain live at emeryechipare.com
- 47 real artwork images uploaded and displayed
- Minimal "Distracted Listening" branding
- Automated workflow with desktop shortcut and sync script

**Phase 9: Social Engagement & Moderation (Nov 21, 2025)**
- Individual artwork pages with unique URLs (/artwork/[id])
- Like functionality with real-time counters
- Comments system with add/view features
- Cloudflare Worker API for dynamic data
- Cloudflare D1 database for storage
- Admin authentication system
- Comment moderation with delete functionality
- CORS properly configured for all operations

### In Progress 🚧
- None - Phase 9 complete!

### Planned 📋
- Contact form functionality (Phase 8)
- Social media links (Instagram, TikTok)
- E-commerce integration (Stripe/PayPal)
- Shopping cart functionality
- SEO optimization
- Social sharing buttons
- Open Graph meta tags

## Documentation

Detailed documentation is available in the `/docs` directory:
- `PROJECT_SETUP.md` - Complete setup history and configuration
- `DEVELOPMENT.md` - Development workflows and commands
- `FUTURE_ENHANCEMENTS.md` - Planned features and roadmap
- `PHASE_9_COMPLETION.md` - Individual artwork pages implementation
- `ADMIN_SYSTEM.md` - Comment moderation guide
- `SESSION_LOG_2025-11-21.md` - Today's development session details

## Key Configuration

### Git
- User: Emery Echipare
- Email: Emery.Echipare@gmail.com
- Branch: main

### Cloudflare Pages
- Primary Project: emeryechipare
- Build Command: `npm run build`
- Output Directory: `out`

### Cloudflare Worker (API)
- Name: emeryechipare-api
- URL: https://emeryechipare-api.emery-echipare.workers.dev
- Database: emeryechipare-db (D1)
- Secrets: ADMIN_PASSWORD

### Next.js
Configured for static export in `next.config.ts`:
```typescript
output: 'export',
images: { unoptimized: true }
```

## Contact

**Artist:** Emery Echipare  
**Email:** Emery.Echipare@gmail.com  
**Website:** emeryechipare.com

## License

All artwork and content © Emery Echipare. All rights reserved.
