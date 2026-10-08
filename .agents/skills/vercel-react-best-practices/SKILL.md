---
name: vercel-react-best-practices
description: React performance optimization guidelines from Vercel Engineering. Use when writing, reviewing, or refactoring React code to ensure optimal performance patterns. Focuses on bundle size, re-render optimization, and client-side performance.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# React Best Practices (Vite + React)

Performance optimization guide for React applications. Focus on what matters for Vite + React (not Next.js).

## When to Apply

Reference these guidelines when:
- Writing new React components
- Reviewing code for performance issues
- Refactoring existing React code
- Optimizing bundle size or load times

## Priority Rules

### CRITICAL: Bundle Size

- **barrel-imports**: Import directly from source files, avoid barrel `index.ts` re-exports
- **dynamic-imports**: Use `React.lazy()` for heavy components not needed on initial load
- **defer-third-party**: Load analytics/logging after hydration
- **conditional**: Load modules only when feature is activated
- **preload**: Preload on hover/focus for perceived speed

### HIGH: Re-render Optimization

- **memo**: Extract expensive work into memoized components with `React.memo()`
- **useMemo**: Memoize expensive computations
- **useCallback**: Stabilize callback references for child components
- **functional-setstate**: Use functional setState for stable callbacks
- **lazy-state-init**: Pass function to useState for expensive initial values
- **no-inline-components**: Don't define components inside components
- **split-combined-hooks**: Split hooks with independent dependencies

### MEDIUM: Rendering Performance

- **hoist-jsx**: Extract static JSX outside components
- **content-visibility**: Use `content-visibility: auto` for long lists
- **animate-wrapper**: Animate div wrapper, not SVG element directly

### LOW-MEDIUM: JavaScript Performance

- **batch-dom-css**: Group CSS changes via classes or cssText
- **index-maps**: Build Map for repeated lookups
- **combine-iterations**: Combine multiple filter/map into one loop
- **early-exit**: Return early from functions
- **set-map-lookups**: Use Set/Map for O(1) lookups
- **tosorted-immutable**: Use toSorted() for immutability

## Anti-patterns to Flag

- `React.memo()` on components with function/object props (wasteful)
- `useEffect` for derived state (compute during render instead)
- `transition: all` (list properties explicitly)
- Defining components inside render (causes remount on every render)
- Missing dependency arrays in useEffect/useMemo/useCallback

## Quick Checks

When reviewing code, look for:
1. Components re-rendering due to unstable references
2. Heavy computations not memoized
3. Large bundles from barrel imports
4. Third-party scripts blocking hydration
5. Missing `React.lazy()` for code splitting