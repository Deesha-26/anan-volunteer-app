# An An 安安 — Volunteer Hub

Interactive prototype of the An An volunteer coordination app for the Chinatown disaster preparedness network.

**This app is for volunteers and coordinators only — elderly residents never touch this app.**

## Screens

- **Home Dashboard** — Status overview, next visit, recent activity, emergency toggle
- **My Residents** — List of assigned residents with status tags and priority indicators
- **Resident Detail** — Full profile, contact info, notes, visit history
- **Log a Visit** — Simple 3-step check-in form (select resident → condition → notes)
- **Emergency Mode** — Red alert interface with priority-sorted resident list and status tracking
- **Resources** — Life Card reference, FEMA guide, emergency protocols, Mandarin phrases

## Run Locally

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

## Deploy to Vercel

Push to GitHub, connect repo in Vercel with:
- Build Command: `npm run build`
- Output Directory: `build`

## About An An

An An (安安) is a community-born volunteer network that reaches isolated elderly Mandarin-speaking residents in NYC's Chinatown during disasters — through door-knock visits, printed safety cards, and landline phone calls.

**Zero smartphones. Zero English. Just trust.**
