# Powerpuff Girls Episode Explorer

A Next.js web app for exploring episodes of The Powerpuff Girls TV show using TVMaze API.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Other commands:
- `npm test` - run tests
- `npm run build` - production build
- `npm run lint` - linting

## Architecture Decisions

### React Server Components
All pages are server components by default. Only `SearchInput` is client component because it needs browser APIs for URL stuff. This keeps JS bundle small.

### Data Fetching
- Server-side fetch with 1 hour cache
- Search filters episodes on server
- Uses `notFound()` for missing episodes

### Component Structure
Components in folders with tests:
```
src/components/
  EpisodeCard/
    index.tsx
    EpisodeCard.test.tsx
```

### Strings
All UI text in `src/constants/strings.ts` for easy changes.

## Trade-offs

| Decision | Trade-off |
|----------|-----------|
| Server-side search | Simpler but needs page reload |
| No state library | Less deps but limited for complex state |
| Tailwind only | Fast but less reusable |
| Vitest | Faster than Jest but smaller ecosystem |

## Accessibility

- Semantic HTML elements
- Skip link for keyboard nav
- ARIA labels where needed
- Focus indicators
- Good color contrast

## What I'd add with more time

- Favorites with localStorage
- Pagination for episodes
- Filter by season/rating
- E2E tests with Playwright
- Better error handling
