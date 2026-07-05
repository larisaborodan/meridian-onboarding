# Meridian Onboarding

This is my solution for the Qubiz internship technical exercise.

The problem: new employees at Meridian get one email ("Welcome! See you on
Monday.") and nothing else. No idea who to ask things, what to do in the
first week, or which days they should even come to the office.

So I built the app I would have wanted on my own first day: one place that
tells you what to do, who people are, and how things work around here.

## What it does

The app has three pages:

- **My Onboarding** - a checklist for the first month, split into Day 1,
  Week 1 and Month 1. You can check tasks off and the progress bar updates.
  Progress is saved in the database, so it's still there after a refresh.
- **People** - all colleagues grouped by department, with their role, Slack
  handle and email. Some people have a "Buddy" badge - they are the ones a
  new hire should feel comfortable asking anything.
- **First Day Guide** - a short summary of what your first day looks like,
  plus an FAQ (hybrid schedule, tools, payroll, meeting rooms etc.).

## Tech stack

React (Vite) for the frontend, Node.js + Express for the API, and SQLite
as the database. I explain why I picked these in [DECISIONS.md](./DECISIONS.md) -
the short version is that I wanted something anyone can run locally in
under two minutes, with zero database setup.

## How to run it

You need Node.js 18 or newer.

Backend (first terminal):

    cd server
    npm install
    node seed.js
    node index.js

This creates the SQLite database, fills it with sample data and starts the
API on http://localhost:3001.

Frontend (second terminal):

    cd client
    npm install
    npm run dev

Then open http://localhost:5173.

## The other docs

- [ASSUMPTIONS.md](./ASSUMPTIONS.md) - what I assumed about users, data and context
- [DECISIONS.md](./DECISIONS.md) - what I built, what I deliberately skipped, and why
- [WHAT_I_WOULD_DO_NEXT.md](./WHAT_I_WOULD_DO_NEXT.md) - what I'd build with two more weeks
- [REFLECTION.md](./REFLECTION.md) - honest thoughts about how this went
