# Development Guide

**Project:** Emery Echipare Art Portfolio  
**Last Updated:** November 20, 2025

## Development Workflow

### Daily Development Routine

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Opens at http://localhost:3000
   - Hot reload enabled (changes appear instantly)
   - Also accessible via network IP for testing on other devices

2. **Make Changes**
   - Edit files in `app/` directory
   - Changes auto-reload in browser
   - Check browser console for errors

3. **Test Locally**
   - Test all pages
   - Check responsive design (resize browser)
   - Test navigation links
   - Verify no console errors

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

5. **Push to GitHub**
   ```bash
   git push origin main
   ```

6. **Deploy to Cloudflare**
   ```bash
   npm run build
   npx wrangler pages deploy out --project-name=emeryechipare-art --branch=main
   ```

### Common Development Commands

```bash
# Install dependencies (after cloning or adding packages)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# View git status
git status

# View git log
git log --oneline -10

# Deploy to Cloudflare
npx wrangler pages deploy out --project-name=emeryechipare-art --branch=main

# List Cloudflare Pages projects
wrangler pages project list

# List recent deployments
wrangler pages deployment list --project-name=emeryechipare-art
```

## Project Structure

### Key Directories

```
app/
├── about/          # About page route
├── contact/        # Contact page route  
├── gallery/        # Gallery page route
├── favicon.ico     # Site icon
├── globals.css     # Global styles
├── layout.tsx      # Root layout (applies to all pages)
└── page.tsx        # Home page
```

### Adding a New Page

1. **Create directory in `app/`**
   ```bash
   mkdir app/newpage
   ```

2. **Create `page.tsx` file**
   ```typescript
   import Link from "next/link";
   
   export default function NewPage() {
     return (
       <div>
         {/* Copy navigation from existing page */}
         <nav>...</nav>
         
         <main>
           <h1>New Page</h1>
         </main>
         
         {/* Copy footer from existing page */}
         <footer>...</footer>
       </div>
     );
   }
   ```

3. **Add to navigation** (in all page files)
   ```tsx
   <Link href="/newpage">New Page</Link>
   ```

4. **Test, commit, deploy**

## Styling Guide

### Tailwind CSS Classes Used

**Colors:**
- `bg-white` - White background
- `bg-gray-50` - Light gray background
- `bg-gray-100` - Slightly darker gray
- `text-gray-900` - Dark gray text (primary)
- `text-gray-600` - Medium gray text (secondary)
- `text-gray-500` - Light gray text (tertiary)

**Layout:**
- `max-w-7xl mx-auto px-6` - Standard page container
- `flex`, `grid` - Layout systems
- `gap-4`, `gap-8` - Spacing between items

**Typography:**
- `font-serif` - Serif font for headings
- `text-5xl`, `text-3xl`, `text-xl` - Font sizes
- `font-bold`, `font-medium` - Font weights

**Responsive:**
- `md:` - Medium screens and up
- `lg:` - Large screens and up
- Mobile-first approach (base styles are mobile)

### Adding Custom Styles

Edit `app/globals.css` for global styles. Most styling should use Tailwind utility classes.

## Component Patterns

### Navigation (Current Implementation)

Currently, navigation is duplicated in each page. This is intentional for simplicity during initial development.

**Future Improvement:** Extract to reusable component
```typescript
// components/Navigation.tsx
export function Navigation() {
  return <nav>...</nav>;
}
```

### Page Layout Pattern

All pages follow this structure:
```typescript
export default function PageName() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 w-full">...</nav>
      
      {/* Main Content with top padding for fixed nav */}
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page content */}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50">...</footer>
    </div>
  );
}
```

## Adding Artwork Images

### Future Implementation Steps

1. **Create images directory**
   ```bash
   mkdir public/artwork
   ```

2. **Add images**
   - Place image files in `public/artwork/`
   - Recommended format: JPEG or PNG
   - Recommended size: 1200x1200px or larger
   - Name format: `artwork-001.jpg`, `artwork-002.jpg`, etc.

3. **Create artwork data file**
   ```typescript
   // lib/artworks.ts
   export const artworks = [
     {
       id: 1,
       title: "Artwork Title",
       image: "/artwork/artwork-001.jpg",
       price: 150,
       description: "Description here",
     },
     // ...more artworks
   ];
   ```

4. **Update Gallery page to use images**
   ```typescript
   import Image from "next/image";
   import { artworks } from "@/lib/artworks";
   
   // Map over artworks array instead of placeholders
   {artworks.map((art) => (
     <div key={art.id}>
       <Image 
         src={art.image}
         alt={art.title}
         width={500}
         height={500}
       />
     </div>
   ))}
   ```

## Testing Checklist

Before deploying, verify:

- [ ] All pages load without errors
- [ ] Navigation links work
- [ ] Responsive on mobile (resize browser to ~375px width)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Build completes successfully (`npm run build`)
- [ ] Images display correctly (if added)
- [ ] Links open in correct tabs (external links use `target="_blank"`)

## Troubleshooting

### Development Server Won't Start

```bash
# Kill any process using port 3000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Then restart
npm run dev
```

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next
rm -rf out

# Reinstall dependencies
rm -rf node_modules
npm install

# Try build again
npm run build
```

### Changes Not Appearing

1. Hard refresh browser (Ctrl+Shift+R)
2. Check terminal for build errors
3. Restart dev server
4. Clear browser cache

### Git Issues

```bash
# Reset to last commit (DANGER: loses uncommitted changes)
git reset --hard HEAD

# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Pull latest from GitHub
git pull origin main
```

## Best Practices

1. **Commit Often**
   - Make small, focused commits
   - Write clear commit messages
   - Push to GitHub regularly

2. **Test Locally First**
   - Always test in dev mode before building
   - Test build locally before deploying

3. **Keep Documentation Updated**
   - Update docs when making structural changes
   - Note any new conventions or patterns

4. **Use TypeScript**
   - Let TypeScript catch errors
   - Add types for new functions/components

5. **Mobile-First**
   - Design for mobile screens first
   - Enhance for larger screens with Tailwind breakpoints

## Resources

- **Next.js App Router:** https://nextjs.org/docs/app
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Hooks:** https://react.dev/reference/react
- **Git Commands:** https://git-scm.com/docs
