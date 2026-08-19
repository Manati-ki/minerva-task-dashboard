# Minerva Task Dashboard

A small React app for tracking hours and earnings across freelance AI-training and labeling platforms (DataAnnotation, Outlier AI, Appen, Remotasks, AligningTurn).

## Features

- Log time/earnings entries per platform
- Filter entries by platform and date range
- Sort entries by date, platform, hours, or earnings
- Per-platform and per-month summary totals
- CSV export
- Inline editing of logged entries
- Data persisted locally via `localStorage`

## Stack

- React + Vite
- Vitest + React Testing Library for tests

## Development

\`\`\`bash
npm install
npm run dev    # start dev server
npm run test   # run tests
npm run build  # production build
\`\`\`
