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
- Development environment setup (Git, Node.js, Wrangler CLI)
- GitHub repository and account configured
- Four-page website structure:
  - Home page with hero and featured works
  - Gallery page (12 placeholder artworks)
  - About page with artist bio
  - Contact page with email form (not functional yet)
- Cloudflare Pages deployment
- Custom domain purchased (DNS pending)

### In Progress 🚧
- None - Foundation is complete!

### Planned 📋
- Upload actual artwork images
- E-commerce integration (Stripe/PayPal)
- Functional contact form
- Individual artwork detail pages
- Shopping cart functionality
- Admin panel for managing artwork
- SEO optimization
- Blog section

## Documentation

Detailed documentation is available in the `/docs` directory:
- `PROJECT_SETUP.md` - Complete setup history and configuration
- `DEVELOPMENT.md` - Development workflows and commands  
- `DEPLOYMENT.md` - Deployment procedures and troubleshooting
- `FUTURE_ENHANCEMENTS.md` - Planned features and roadmap

## Key Configuration

### Git
- User: Emery Echipare
- Email: Emery.Echipare@gmail.com
- Branch: main

### Cloudflare
- Primary Project: emeryechipare
- Working Project: emeryechipare-art
- Build Command: `npm run build`
- Output Directory: `out`

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
