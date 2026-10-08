<!-- OPENWIKI:START -->

## OpenWiki

This repository has a generated `openwiki/` evidence index. It is optional just-in-time context, not required startup reading.

- Do not enumerate, preload, or search wikis at task start. Use retrieval when the user asks for it, when unfamiliar architecture or dependency behavior materially affects the task, or when source inspection leaves an important uncertainty. Stop once the question is grounded.
- When those conditions apply and OpenWiki retrieval tools are available, use `openwiki_search` for just-in-time context and `openwiki_read` for the relevant complete sections. If search returns `workspace_required`, ask which listed workspace to use and retry with its ID.
- Use `openwiki_list_workspaces` or `openwiki_list_wikis` when workspace membership itself needs to be discovered.
- If the retrieval tools are unavailable, read `openwiki/quickstart.md` and follow its links to the relevant pages.
- Treat source code and tests as authoritative. A brief's unknowns and review items are verification gaps, not automatic requirements.
- Prefer the narrowest quiet validation that proves the changed behavior. Preserve complete failure output.

The scheduled OpenWiki GitHub Actions workflow refreshes the repository wiki. Do not hand-edit generated OpenWiki pages unless explicitly asked; prefer updating source code/docs and letting OpenWiki regenerate.

<!-- OPENWIKI:END -->

## Accessibility Toolkit

This project enforces accessibility through a three-layer stack:

### Layer 1: Deterministic Checks (no agent context cost)

- **eslint-plugin-jsx-a11y**: Catches a11y issues at lint time (e.g., missing `aria-label`, click handlers without keyboard support)
- **axe-core**: Runtime a11y testing via `vitest` + `jest-axe` in unit tests
- **CI enforcement**: PRs are blocked if lint or tests fail

Run locally:
```bash
npm run lint          # jsx-a11y rules
npm test              # axe-core a11y tests
```

### Layer 2: E2E Evidence (Playwright + axe-core)

- **@axe-core/playwright**: Full-page a11y audit on real rendered pages
- Tests keyboard navigation, skip links, and WCAG 2.1 AA compliance
- Runs on both desktop and mobile viewports

Run locally:
```bash
npm run build
npm run test:e2e
```

### Layer 3: Design Review Skills

Two Vercel skills available for code review:

- **vercel-react-best-practices**: Performance optimization for React (bundle size, re-render, rendering)
- **vercel-web-design-guidelines**: UI/UX audit (a11y, focus states, forms, animation, typography, touch)

Use when reviewing code or asking for UI feedback.

## Skills

| Skill | Trigger | Purpose |
|-------|---------|--------|
| impeccable | UI design/review | Visual design, UX, theming, responsive |
| vercel-react-best-practices | React perf review | Bundle, re-render, rendering optimization |
| vercel-web-design-guidelines | UI audit | A11y, forms, animation, typography, touch |
