# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix UI), Vite 8, Nitro (server/SSG), Supabase (Postgres), Vercel (deploy)

## Users

**Primary:** Recruiters, hiring managers, and tech leads evaluating senior front-end/mobile developers for full-time roles or contracts. They visit from job boards, LinkedIn, or direct referrals, typically on mobile or desktop, with 30–120 seconds to form a first impression.

**Secondary:** Potential clients seeking a senior developer for product work in fintech or logistics. They look for evidence of shipped products at scale, technical depth, and communication quality.

## Product Purpose

Personal portfolio that proves Guilherme Aguiar is a senior front-end/mobile developer with 10+ years shipping financial and logistics products used by millions. The site exists to convert visits into interview requests or project inquiries by making technical depth, real-world impact, and communication skills immediately visible.

Success = a recruiter or client reaches out after spending under 2 minutes on the site.

## Positioning

A bilingual (pt-BR/en) portfolio that combines React, React Native, and generative AI applied to UI — turning days of rollout into minutes. Not a template or generic portfolio; a custom-built single-page application with SSG, code-splitting, and production-grade infrastructure that demonstrates the developer's own craft.

## Operating Context

- Deployed on Vercel with automatic deploys from `main`
- Supabase for contact form persistence and experience data
- Google reCAPTCHA v3 for anti-spam on contact form
- Vercel Analytics + Speed Insights for traffic monitoring
- BackstopJS for visual regression testing before deploys
- Bilingual content (pt-BR default, en switchable) persisted in localStorage

## Capabilities and Constraints

- Single-page application with 6 sections: About, Impact, Experience, Skills, Case Study, Contact
- SSG/prerender for fast FCP/LCP; below-fold sections lazy-loaded via IntersectionObserver
- Theme persistence (dark default, light toggle) via localStorage
- Resume PDF download and external link
- Contact form with server-side reCAPTCHA verification and Supabase persistence
- No CMS — content hardcoded in translations.ts and components
- No blog or dynamic content — static portfolio only
- No authentication or user accounts

## Brand Commitments

- **Name:** Guilherme Aguiar
- **Domain:** guilherme.digital
- **Voice:** Professional, technical, direct. First-person where appropriate.
- **Visual:** Dark theme primary, blue/purple accent, clean minimal layout
- **Identity:** Personal brand, not agency or company

## Evidence on Hand

- Real work experience (10+ years, financial/logistics products)
- Resume PDF at `public/guilherme-aguiar-cv.pdf`
- Case study content for portfolio projects
- Bilingual copy (pt-BR and en) in `src/i18n/translations.ts`
- No testimonials or press mentions currently included

## Product Principles

1. **Performance is a feature** — SSG, lazy loading, and bundle budgets prove the developer cares about real user metrics
2. **Show, don't tell** — The site itself demonstrates the craft (code quality, animations, responsiveness)
3. **Bilingual by default** — Reach both Brazilian and international opportunities without friction
4. **Production-grade infrastructure** — reCAPTCHA, Supabase, analytics show backend competence alongside frontend
5. **Accessible and responsive** — Works on all devices and respects user preferences (reduced motion, theme)

## Accessibility & Inclusion

- Respects `prefers-reduced-motion` — all animations disabled when user preference is set
- Dark/light theme toggle for visual comfort
- Semantic HTML with proper heading hierarchy
- ARIA labels on interactive elements
- reCAPTCHA badge visibility managed (hidden when not relevant, shown when form is active)