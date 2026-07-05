# Decisions

## Product decisions

**Which features did I include?**

Three: the onboarding checklist, the people directory, and the first day
guide. I picked them by asking one question: what would have actually
helped me on a first day at a company where I know nobody and nothing?

The answers were, in order: "what am I supposed to do?" (checklist),
"who do I ask?" (people), and "how do things work here?" (guide). Every
feature maps to one of those questions.

**How did I prioritize them?**

By risk. The checklist came first because it was the only feature with
real interaction (updating the database, tracking progress) - if something
was going to eat my time, it was that one. People and the Guide are mostly
read-only views, so I left them for later, knowing they were low-risk.

I also made sure each feature was completely done (working, styled,
committed) before starting the next one. Three finished features felt more
valuable than five half-finished ones.

**Which features did I intentionally leave out?**

- **An admin panel for HR.** Biggest cut. HR editing data through a UI is
  clearly needed long-term, but seed data does the same job for a demo,
  and the panel would have cost me more time than the three user-facing
  pages combined.
- **Authentication.** The assignment says it's optional and should make
  sense in context. It didn't: single user, no sensitive data, and the app
  should ideally be readable *before* your first day, without an account.
- **Per-user progress.** Consequence of no accounts. Documented in
  ASSUMPTIONS.md as a known simplification.
- **Notifications / reminders.** Nice idea, zero value in a local demo.

## Technical decisions

**Why this database structure?**

Three tables: employees, onboarding_tasks, faq. They match the three pages
one-to-one, which keeps the API and the frontend simple. Tasks have a
due_phase column (day1 / week1 / month1) with a CHECK constraint, so the
database itself rejects invalid phases, and a sort_order column so the
display order is controlled by data, not by code.

**Why these libraries/frameworks?**

- **React + Vite** - React is the frontend I know best, and Vite gives a
  working setup in one command. No time spent on configuration.
- **Express** - the smallest reasonable way to put an API in front of a
  database. The whole server is one readable file.
- **SQLite (better-sqlite3)** - I actually have PostgreSQL installed and
  use it, but I chose SQLite deliberately: whoever evaluates this should
  be able to run it with npm install and nothing else. No database server,
  no credentials, no .env. For a 200-person company's internal tool the
  data volume is tiny anyway. In production I'd switch to Postgres; the
  schema would carry over almost unchanged.
- **No react-router** - three views didn't justify a routing dependency.
  Tab switching with useState does the same job in 10 lines. If the app
  grew (per-employee pages, admin section), I'd add it.

**If I had more time, what would I build differently?**

I'd put employee-task relations in the schema from day one (a
task_progress join table instead of a completed flag on tasks). I knew it
was the "more correct" design, but it only pays off once accounts exist,
so I consciously took the shortcut. Retrofitting it later means a small
migration - acceptable, but it would have been free if done from the start.

## UX decisions

**Why this user flow?**

The app opens directly on the checklist - no landing page, no login. A new
employee opening this app has one dominant question ("what do I do?") and
the first screen answers it. People and the Guide are one click away as
tabs, always visible.

Two small details I care about: the progress bar, because moving it is
genuinely satisfying and finishing tasks should feel like progress, and
the Buddy badges, because "you're allowed to ask this person anything" is
exactly the permission a nervous new hire needs.

**Did I test it with anyone?**

Not with a real user - the timeline didn't allow it. The closest I got was
testing the README setup instructions from scratch (deleted the database,
followed my own steps literally) to make sure an evaluator's first
experience works. Real user testing is in WHAT_I_WOULD_DO_NEXT.md.

**What changed after receiving feedback?**

Since I had no external feedback, the changes came from using the app
myself while building it. The biggest one: task descriptions were
originally one generic line each, and reading them as "the new employee" I
realized they answered nothing. I rewrote them to include the concrete
details a real person would need (room numbers, channel names, who "Laura"
is). Content turned out to matter as much as features.