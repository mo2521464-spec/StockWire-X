# StockWire X Homepage

A modern, responsive financial media website built with React, TypeScript, and Tailwind CSS. Features multi-brand theming, comprehensive SEO optimization, and analytics integration.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test
```

## 📋 Project Overview

### Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3 + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Backend**: Express.js server (integrated with Vite)
- **Testing**: Vitest
- **Icons**: Lucide React

### Key Features

- ✅ Mobile-first responsive design
- ✅ Multi-brand theming system (StockWire X + Discovery Alert)
- ✅ Comprehensive SEO optimization with structured data
- ✅ GA4 analytics integration
- ✅ Form validation with accessibility
- ✅ Performance optimized (Lighthouse ≥90)
- ✅ Brand compliance (Inter typography, approved colors)

## 🎨 Brand System

### StockWire X Brand Tokens

```typescript
const stockWireXTokens = {
  colors: {
    navy1: "#051230", // Primary navy
    navy2: "#0B1630", // Secondary navy
    orange: "#E77E22", // Brand orange (CTAs)
    gold: "#EDBF54", // Accent gold
  },
  typography: {
    heading: "Inter Bold",
    subheading: "Inter SemiBold",
    body: "Inter Light",
    accent: "Poppins", // (accent only)
  },
};
```

### Brand Switching

The system supports multi-brand theming via domain detection or URL parameters:

```typescript
// Automatic brand detection
const brand = useBrand(); // Returns StockWire X or Discovery Alert tokens

// Manual brand switching (for testing)
const brand = brands["stockwirex"] || brands["discoveryalert"];
```

## 🏗️ Architecture

### Project Structure

```
client/                     # React SPA frontend
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui base components
│   ├── Hero.tsx          # Hero section with search
│   ├── TopNewsFeed.tsx   # News feed with filters
│   ├── CategoryBlock.tsx # Sector-specific news
│   ├── MediaHighlights.tsx # Video content carousel
│   ├── TrustedBy.tsx     # Social proof section
│   ├── AboutStrip.tsx    # Company info & transparency
│   ├── EmailSignup.tsx   # Newsletter signup forms
│   ├── PartnerZone.tsx   # Advertising opportunities
│   ├── NewsCard.tsx      # Article display component
│   └── SiteFooter.tsx    # SEO-optimized footer
├── lib/                  # Utilities and configurations
│   ├── brand-tokens.ts   # Multi-brand theming system
│   ├── seo.ts           # SEO and structured data
│   ├── analytics.ts     # GA4 event tracking
│   └── utils.ts         # Helper functions
├── pages/               # Route components
│   ├── Index.tsx        # Homepage
│   └── NotFound.tsx     # 404 page
└── global.css           # Tailwind + brand styles

server/                  # Express API backend
├── routes/             # API endpoints
└── index.ts           # Server configuration

shared/                 # Shared TypeScript types
└── api.ts             # API interfaces
```

### Homepage Sections (In Order)

1. **Hero** - Headline, search, CTAs, ticker strip
2. **Top News Feed** - Real-time articles with sector filters
3. **Category Blocks** - Tech, Biotech, Healthcare, Industrials, Financials
4. **Media Highlights** - Video content carousel
5. **Trusted By** - Social proof with logos and stats
6. **About Strip** - Independence & Google Cloud partnership
7. **Email Signup** - Newsletter form with validation
8. **Partner Zone** - Advertising opportunities
9. **Trending** - Most popular content
10. **Footer** - SEO links, navigation, social media

## 🔧 Component Usage

### Hero Component

```tsx
<Hero
  title="Insights at the Speed of Markets."
  subtitle="Breaking ASX news across multiple sectors."
  onSearch={(query) => handleSearch(query)}
  onCtaPrimary={() => trackCtaClick("Get Free Alerts", "hero")}
  onCtaSecondary={() => trackCtaClick("See Membership", "hero")}
  showTicker={true}
/>
```

### News Feed Component

```tsx
<TopNewsFeed
  initialSector="all"
  tagFilters={["Quarterly Results", "M&A", "Capital Raises"]}
  pagination={true}
  onFilterChange={(sector, tags, sort) => {
    trackFilterChange("sector", sector, "top-news");
    // Update feed data
  }}
/>
```

### Email Signup Component

```tsx
<EmailSignup
  variant="standalone" // 'inline' | 'modal' | 'standalone'
  onSubmit={(data) => {
    trackNewsletterSignup("homepage", "standalone");
    // Submit to CRM
  }}
  title="Get Breaking ASX Alerts Direct to Your Inbox."
  subtitle="Join 250,000+ monthly readers."
  showFeatures={true}
/>
```

## 📊 Analytics Integration

### GA4 Event Tracking

The system tracks all required events as specified:

```typescript
import { useAnalytics } from "@/lib/analytics";

const {
  trackCtaClick,
  trackNewsletterSignup,
  trackFilterChange,
  trackVideoPlay,
} = useAnalytics();

// CTA clicks
trackCtaClick("Get Free Alerts", "hero", "primary");

// Newsletter signups
trackNewsletterSignup("homepage", "inline");

// Filter changes
trackFilterChange("sector", "Tech", "news-feed");

// Video plays
trackVideoPlay("Daily Market Wrap", "8:42", "YouTube", "media-highlights");
```

### Event Types Tracked

- ✅ `click_cta` - All CTA button clicks
- ✅ `newsletter_signup` - Email form submissions
- ✅ `filter_change` - News filter interactions
- ✅ `video_play` - Media content engagement
- ✅ `search` - Search queries
- ✅ `article_view` - Content consumption
- ✅ `error` - Technical issues
- ✅ `performance_metric` - Core Web Vitals

## 🔍 SEO Implementation

### Structured Data

Automatic generation of schema.org markup:

```typescript
// Website schema
generateStructuredData("website", {});

// News article schema
generateStructuredData("newsarticle", {
  title: "Article Title",
  excerpt: "Article description",
  author: "Author Name",
  publishedAt: "2024-01-15T10:30:00Z",
  sector: "Technology",
  tags: ["Earnings", "Tech"],
  ticker: ["XRO", "TLS"],
});

// Breadcrumb navigation
generateStructuredData("breadcrumb", [
  { name: "Home", url: "/" },
  { name: "Technology", url: "/sectors/tech" },
  { name: "Article Title" },
]);
```

### Meta Tags & Open Graph

```typescript
updateMetaTags({
  title: "Page Title - StockWire X",
  description: "Page description for search engines",
  canonical: "https://stockwirex.com/page",
  image: "https://stockwirex.com/og-image.jpg",
  type: "article",
  author: "Author Name",
  tags: ["ASX", "Technology"],
});
```

## 🎯 Performance & Accessibility

### Core Web Vitals Targets

- **LCP**: < 2.5s (Largest Contentful Paint)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **FCP**: < 1.8s (First Contentful Paint)
- **Lighthouse Score**: ≥ 90 (Performance, SEO, Best Practices)

### Accessibility Features

- ✅ WCAG AA+ contrast ratios
- ✅ Keyboard navigation support
- ✅ Screen reader optimized (aria-\* attributes)
- ✅ Semantic HTML structure
- ✅ Form validation with error messages
- ✅ Focus indicators on interactive elements

## 🌐 Data Integration

### Mock Data Structure

```typescript
interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  sector: "Tech" | "Biotech" | "Healthcare" | "Industrials" | "Financials";
  tags: string[];
  ticker: string[];
  coverImage?: string;
  sourceType: "ASX" | "Editorial";
  viewCount: number;
  popularityScore: number;
}
```

### API Integration Points

Replace mock data with real API calls:

```typescript
// News feed data
const fetchArticles = async (sector?: string, tags?: string[]) => {
  const response = await fetch("/api/articles", {
    method: "POST",
    body: JSON.stringify({ sector, tags }),
  });
  return response.json();
};

// Company/ticker search
const searchCompanies = async (query: string) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  return response.json();
};
```

## 🚀 Deployment

### Environment Variables

```env
# Analytics
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_ANALYTICS=true

# Brand Configuration
VITE_BRAND=stockwirex
VITE_API_BASE_URL=https://api.stockwirex.com

# Feature Flags
VITE_ENABLE_TICKER=true
VITE_ENABLE_VIDEO_AUTOPLAY=false
```

### Build & Deploy

```bash
# Production build
pnpm build

# Deploy to Netlify (via MCP)
# Connect Netlify MCP in Builder.io interface

# Deploy to Vercel (via MCP)
# Connect Vercel MCP in Builder.io interface

# Manual deployment
pnpm start # Serves built files on port 8080
```

### Performance Optimization

- ✅ Image optimization (next/image equivalent)
- ✅ Code splitting by route
- ✅ Lazy loading for media content
- ✅ Minimal hydration strategy
- ✅ Prefetch for critical routes
- ✅ Service worker for caching

## 🧪 Testing

### Component Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Generate coverage report
pnpm test --coverage
```

### E2E Testing with Playwright

```bash
# Install Playwright
npx playwright install

# Run E2E tests
npx playwright test

# Test specific journeys
npx playwright test --grep "newsletter signup"
npx playwright test --grep "news filtering"
```

### Manual Testing Checklist

- [ ] All CTA buttons work and track analytics
- [ ] Newsletter signup validates and submits
- [ ] News filters update content correctly
- [ ] Search functionality works
- [ ] Video players load and track views
- [ ] Responsive design on all devices
- [ ] Brand switching works correctly
- [ ] SEO meta tags generate properly

## 🎨 Storybook Documentation

### Component Stories

```bash
# Start Storybook dev server
pnpm storybook

# Build static Storybook
pnpm build-storybook
```

Stories include:

- All UI components with brand variations
- Interactive states (loading, error, empty)
- Responsive breakpoint demonstrations
- Accessibility testing scenarios

## 🔧 Customization

### Adding New Sectors

```typescript
// 1. Update sector types
type Sector =
  | "Tech"
  | "Biotech"
  | "Healthcare"
  | "Industrials"
  | "Financials"
  | "Energy";

// 2. Add sector configuration
const sectorConfig = {
  Energy: {
    color: "from-green-500 to-blue-600",
    icon: "⚡",
    description: "Energy and renewable resources",
  },
};

// 3. Update filter components
const sectors = [{ value: "energy", label: "Energy" }];
```

### Brand Customization

```typescript
// Create new brand token set
export const newBrandTokens: BrandTokens = {
  name: "New Brand",
  palette: {
    primary: "#123456",
    secondary: "#654321",
    accent: "#ABCDEF",
    // ... other colors
  },
  typography: {
    headingFont: "Custom Font",
    // ... other fonts
  },
};

// Add to brands registry
export const brands = {
  stockwirex: stockWireXTokens,
  discoveryalert: discoveryAlertTokens,
  newbrand: newBrandTokens,
};
```

## 📞 Support & Maintenance

### Common Issues

**Q: Analytics events not tracking**
A: Check GA4 Measurement ID in environment variables and ensure analytics is enabled.

**Q: Brand switching not working**
A: Verify domain configuration in `getCurrentBrand()` function.

**Q: Search functionality missing**
A: Implement debounced search with autocomplete in Hero component.

**Q: Images not loading**
A: Replace placeholder image URLs with actual CDN links.

### Contributing Guidelines

1. Follow existing code style and TypeScript patterns
2. Maintain brand compliance in all UI changes
3. Add analytics tracking for new interactive elements
4. Update tests for component modifications
5. Ensure accessibility standards are met

### Performance Monitoring

- Use Lighthouse CI for continuous performance testing
- Monitor Core Web Vitals in production
- Track analytics for user behavior insights
- Regular accessibility audits

---

## 📋 Brand Kit Compliance Checklist

### ✅ Typography

- [x] Inter Bold for headings
- [x] Inter SemiBold for subheadings
- [x] Inter Light for body text
- [x] Poppins for accents only

### ✅ Colors

- [x] Navy (#051230, #0B1630) for text and backgrounds
- [x] Orange (#E77E22) for CTAs and accents
- [x] Gold (#EDBF54) for highlights
- [x] Proper contrast ratios (AA+ compliant)

### ✅ Components

- [x] CTAs use brand orange background
- [x] Text uses navy colors
- [x] Consistent spacing and typography hierarchy
- [x] Logo usage follows brand guidelines

---

**Built with ❤️ by the StockWire X team**
