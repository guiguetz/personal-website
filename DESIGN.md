# Design

<!-- impeccable:design-schema 1 -->

<!-- ============================================================
     STAGED FRONTMATTER — edit before committing
     ============================================================ -->

**Inherits product truth from:**
[PRODUCT.md](./PRODUCT.md)

**Core aesthetic tags:**
dark-first, minimal, technical, developer-portfolio

**Design principles (short phrases):**
1. Performance is visible — the site itself proves the craft
2. Dark-first with purposeful accent color
3. Content over chrome — let the work speak
4. Smooth but not distracting — respect reduced-motion
5. Bilingual without friction — language toggle is always accessible

**Palette:**
- Background: `hsl(222 47% 5%)` — deep dark navy
- Foreground: `hsl(213 31% 91%)` — cool light gray
- Accent: `hsl(239 92% 75%)` — vibrant blue-purple
- Muted: `hsl(215 20% 62%)` — subdued blue-gray
- Card: `hsl(222 40% 8%)` — slightly lighter dark
- Border: `hsl(217 33% 20%)` — subtle dark border
- Light theme: Background `hsl(210 40% 98%)`, Foreground `hsl(222 47% 11%)`, Accent `hsl(239 84% 60%)`

**Typography:**
- Display/body: Outfit — geometric sans-serif, modern and distinctive
- Code: JetBrains Mono — developer-grade monospace
- Stack: `'Outfit', ui-sans-serif, system-ui, sans-serif`

**Border radius:**
`0.75rem` (12px) — consistent across all components

**Surface treatment:**
- `.panel` — hairline gradient border (brighter at top, fades down), hover glow with primary color
- `.panel-interactive` — adds hover lift (-translate-y-0.5) with subtle primary shadow
- `.glass` — glassmorphism: 60% card background + 12px backdrop blur
- `.bg-grid` — fine 3.5rem grid pattern background

**Motion tokens:**
- `fade-in-up` — 16px translateY + opacity, 0.5s ease
- `pulse-soft` — opacity 1→0.5→1, 2s infinite
- `shimmer` — 2s background-position sweep
- Respects `prefers-reduced-motion: reduce` — all animations disabled

**Spacing/size tokens:**
- Container: centered, 2rem padding, max-width 1400px
- Sidebar: fixed left on desktop (w-60), mobile drawer overlay
- Section scroll-margin: 6rem

**Component inventory:**
- `Panel` — card with gradient hairline border, optional interactive hover
- `Sidebar` — fixed navigation with section links, mobile hamburger drawer
- `LazyMount` — IntersectionObserver wrapper (rootMargin 400px)
- `ThemeToggle` — dark/light mode switch
- `I18nToggle` — pt-BR/en language switch with flag icons
- `LanguageToggle` — compact language switcher
- `shadcn/ui` — Button, Card, Badge, Input, Textarea, Dialog, DropdownMenu, Tooltip, Sonner (toast)
- `FlagIcons` — SVG flags for pt-BR and en

**Data patterns:**
- Section order in Sidebar: About, Impact, Experience, Skills, Case Study, Contact
- Form fields: name, email, phone, message (ContactSection)
- i18n: pt-BR default, en switchable, persisted in localStorage
- Theme: dark default, light toggle, persisted in localStorage

**Images:**
- Portrait: `src/assets/guilherme-aguiar.png`
- Favicon: `public/favicon.svg` (rocket icon)
- OG image: `public/og-image.png`
- Resume PDF: `public/guilherme-aguiar-cv.pdf` (downloadable)

**Unique attributes:**
- Code-splitting per section via React.lazy + Suspense
- SSG/prerender via custom Vite plugin + rolldown
- Contact form with server-side reCAPTCHA v3 verification
- Supabase integration for experience data and contact persistence
- Hairline gradient borders with hover glow — distinctive visual signature
- Fine grid background pattern for depth

**Opportunities:**
- The grid background pattern could be more prominent in hero section
- Hover states could include more micro-interactions (scale, color shifts)
- Loading states could use skeleton screens instead of generic spinners
- Skill tags could have subtle category-based coloring

**Verbatim design language from source:**
- `font-feature-settings: 'cv02', 'cv03', 'cv04', 'ss01'` — stylistic alternates enabled
- `box-shadow: 0 0 60px -12px` — hero section ambient glow
- `backdrop-filter: blur(12px)` — glass effect
- `::selection { bg-primary/30 }` — accent-colored text selection
- Custom scrollbar: 8px width, primary/50 on hover