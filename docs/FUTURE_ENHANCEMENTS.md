# Future Enhancements Roadmap

**Project:** Emery Echipare Art Portfolio  
**Last Updated:** November 20, 2025

This document outlines planned features and enhancements for the website.

## Priority 1: Essential Features

### 1. Real Artwork Images
**Status:** Not started  
**Priority:** High  
**Description:** Replace placeholder images with actual artwork

**Steps:**
1. Create `public/artwork/` directory
2. Upload artwork images (optimized for web)
3. Create `lib/artworks.ts` data file with artwork information
4. Update Gallery page to use real data
5. Update Home page featured works

**Technical Notes:**
- Use Next.js Image component for optimization (requires build configuration update for static export)
- Or use regular `<img>` tags for now (simpler with static export)
- Recommended image size: 1200x1200px
- Format: JPEG (smaller file size) or PNG (if transparency needed)

### 2. Individual Artwork Pages
**Status:** Not started  
**Priority:** High  
**Description:** Detailed view for each artwork

**Implementation:**
```
app/
└── gallery/
    ├── page.tsx (gallery grid)
    └── [id]/
        └── page.tsx (individual artwork)
```

**Features:**
- Large artwork image
- Title and description
- Price and sizing options
- "Add to Cart" or "Purchase" button
- Back to gallery link
- Related artworks

### 3. Fix Custom Domain
**Status:** In progress  
**Priority:** High  
**Description:** Get emeryechipare.com working correctly

**Next Steps:**
1. Check DNS propagation status in Cloudflare dashboard
2. Verify SSL certificate is active
3. Test domain resolution
4. Update primary project if needed

## Priority 2: E-Commerce Functionality

### 4. Shopping Cart
**Status:** Not started  
**Priority:** Medium-High  
**Description:** Allow users to add multiple items before purchasing

**Implementation Options:**
- Client-side state (React Context or Zustand)
- LocalStorage for persistence
- Display cart icon in navigation with item count

**Features:**
- Add to cart button on artwork pages
- Cart icon in navigation
- Cart page showing all items
- Update quantities
- Remove items
- Total price calculation

### 5. Payment Integration
**Status:** Not started  
**Priority:** Medium-High  
**Description:** Accept payments for artwork purchases

**Recommended:**  
Stripe Checkout (easiest for Next.js)

**Steps:**
1. Create Stripe account
2. Install Stripe SDK: `npm install @stripe/stripe-js stripe`
3. Set up Stripe products for artworks
4. Create checkout API route
5. Implement "Checkout" button
6. Handle success/cancel redirects
7. Send confirmation emails

**Alternative:**
PayPal integration (if preferred)

### 6. Order Confirmation & Email
**Status:** Not started  
**Priority:** Medium  
**Description:** Send email confirmations for purchases

**Options:**
- Stripe automatic emails
- Custom emails via service (Resend, SendGrid, etc.)

**Email Should Include:**
- Order number
- Artwork details
- Total amount
- Estimated delivery
- Contact information

## Priority 3: User Experience

### 7. Contact Form Functionality
**Status:** UI only  
**Priority:** Medium  
**Description:** Make contact form actually send messages

**Implementation Options:**

**Option A: Email Service (Recommended)**
- Use Resend or SendGrid
- Form submits to API route
- API route sends email
- Show success message to user

**Option B: Form Service**
- Use Formspree or similar
- Simple form action, no backend needed
- Emails go directly to Emery.Echipare@gmail.com

**Steps:**
1. Choose service and sign up
2. Install SDK if needed
3. Create API route for form submission
4. Update Contact page to handle submission
5. Add loading state and success/error messages

### 8. Image Lightbox/Gallery Viewer
**Status:** Not started  
**Priority:** Low-Medium  
**Description:** Click artwork to view larger in overlay

**Implementation:**
- Use library like `yet-another-react-lightbox`
- Or build custom modal component
- Includes zoom, navigation arrows

### 9. Search and Filter
**Status:** Not started  
**Priority:** Low-Medium  
**Description:** Help users find specific artwork

**Features:**
- Search by title/description
- Filter by price range
- Filter by category/style (once categories added)
- Sort by: newest, price (low-high), price (high-low)

### 10. Artwork Categories/Tags
**Status:** Not started  
**Priority:** Low-Medium  
**Description:** Organize artwork by type

**Examples:**
- Paintings
- Digital Art
- Prints
- Originals vs. Prints

**Implementation:**
- Add category field to artwork data
- Create category filter UI
- Option: Create separate pages per category

## Priority 4: Content & Features

### 11. Blog/News Section
**Status:** Not started  
**Priority:** Low  
**Description:** Share updates, process, inspiration

**Implementation:**
```
app/
└── blog/
    ├── page.tsx (blog list)
    └── [slug]/
        └── page.tsx (individual post)
```

**Options:**
- Markdown files in `/content/blog/`
- Use CMS like Sanity or Contentful
- Simple JSON data file

### 12. Admin Panel
**Status:** Not started  
**Priority:** Low  
**Description:** Manage artwork without editing code

**Features:**
- Add/edit/delete artwork
- Upload images
- Update prices
- Manage inventory
- View orders

**Implementation:**
- Build custom with Next.js
- Or use headless CMS (Sanity, Strapi)

### 13. Newsletter Signup
**Status:** Not started  
**Priority:** Low  
**Description:** Collect emails for updates

**Services:**
- Mailchimp
- ConvertKit
- Resend

**Placement:**
- Footer
- Pop-up (be careful not to annoy users)

### 14. Social Media Integration
**Status:** Not started  
**Priority:** Low  
**Description:** Link to social profiles, share buttons

**Features:**
- Social icons in footer
- Share buttons on artwork pages
- Instagram feed integration

## Priority 5: Optimization

### 15. SEO Optimization
**Status:** Partial (basic metadata exists)  
**Priority:** Medium  
**Description:** Improve search engine visibility

**Tasks:**
- Add metadata to all pages
- Create sitemap.xml
- Add robots.txt
- Implement Open Graph tags for social sharing
- Add JSON-LD structured data for artworks
- Optimize images (alt text, file names)

### 16. Performance Optimization
**Status:** Not started  
**Priority:** Low  
**Description:** Make site load faster

**Tasks:**
- Optimize images (compression, formats)
- Lazy load images below fold
- Minimize CSS/JS bundle size
- Add caching headers

### 17. Analytics
**Status:** Not started  
**Priority:** Low  
**Description:** Track visitors and behavior

**Options:**
- Google Analytics 4
- Plausible (privacy-friendly)
- Cloudflare Web Analytics (free, privacy-focused)

**Metrics to Track:**
- Page views
- Most viewed artworks
- Conversion rate
- Traffic sources

## Priority 6: Nice-to-Have

### 18. Dark Mode
**Status:** Not started  
**Priority:** Low  
**Description:** Optional dark color scheme

**Implementation:**
- Use Tailwind dark mode classes
- Add toggle button in navigation
- Store preference in localStorage

### 19. Multilingual Support
**Status:** Not started  
**Priority:** Low  
**Description:** Support multiple languages

**Implementation:**
- next-intl or similar library
- Translate all text
- Language selector in navigation

### 20. Customer Reviews
**Status:** Not started  
**Priority:** Low  
**Description:** Let customers leave feedback

**Features:**
- Star ratings
- Written reviews
- Display on artwork pages
- Moderation system

### 21. Wishlist/Favorites
**Status:** Not started  
**Priority:** Low  
**Description:** Save artwork for later

**Implementation:**
- Heart icon on artworks
- Store in localStorage or database
- Dedicated wishlist page

### 22. Print Size Options
**Status:** Not started  
**Priority:** Medium (if selling prints)  
**Description:** Offer different sizes at different prices

**Implementation:**
- Size selector on artwork page
- Price updates based on size
- Store size options in artwork data

## Implementation Notes

### Component Extraction
As features are added, consider extracting reusable components:
- `<Navigation />` - Currently duplicated across pages
- `<Footer />` - Currently duplicated
- `<ArtworkCard />` - For gallery grid items
- `<Button />` - Consistent button styling

### State Management
For cart and user preferences, consider:
- React Context (built-in, good for simple needs)
- Zustand (lightweight, easy to use)
- Redux (if app becomes very complex)

### Database
If admin panel or user accounts are needed:
- Supabase (PostgreSQL, authentication included)
- PlanetScale (MySQL)
- MongoDB Atlas

### Testing
Before deploying major features:
- Test on mobile devices
- Test all user flows
- Test error cases
- Get user feedback

## Tracking Progress

When starting work on any feature:
1. Update status in this document
2. Create GitHub issues for tasks
3. Document decisions in commit messages
4. Update README.md when feature is complete

## Questions or Ideas?

Add new feature ideas to this document with:
- Brief description
- Rough priority
- Any relevant notes or links

Contact: Emery.Echipare@gmail.com
