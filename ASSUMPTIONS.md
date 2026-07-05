# Assumptions

## About the users

**Who uses the application?**

The main user is the new employee. I built everything from their
perspective, because they are the ones with the actual problem - HR at
Meridian is one person and can't personally walk 2-3 new people through
everything every month.

HR would be the second user (they own the data: tasks, people, FAQ), but I
assumed they don't need their own interface yet. With 2-3 hires per month,
editing the seed data is annoying but acceptable for a first version. An
admin panel is the first thing I'd build next (see WHAT_I_WOULD_DO_NEXT.md).

Managers and colleagues don't use the app directly - they show up *in* it
(as buddies and contact people), but they have no reason to open it.

**What does the user already know when opening the app for the first time?**

Almost nothing - that's the whole point. I assumed they know they got hired,
when their first day is, and that someone sent them a link to this app.
Everything else (schedule, people, tools, what to do) should be learnable
from inside the app. That's why the First Day Guide exists as its own page.

## About the data

**Who enters the information?**

HR (Laura, in my sample data). Tasks, people and FAQ answers are things
only HR realistically knows. For this version the data lives in a seed
script (server/seed.js), which plays the role of "HR filled this in".

**When is the information added?**

Before the new employee's first day. The app only makes sense if it's
already filled in when the new hire opens it - an empty checklist on day
one would be worse than no app at all.

**What happens if information is missing or incorrect?**

Right now: the app shows whatever is in the database, so wrong data stays
wrong until HR fixes the seed and re-runs it. That's the weakest part of
the current design and I'm aware of it. One small thing I did add: the
"Give onboarding feedback" task in Month 1 exists exactly so that wrong or
confusing info gets reported back to HR by every new hire.

## About the context

**What device does the new employee use on the first day?**

A laptop - at Meridian the first day starts with picking up your laptop,
so I optimized for desktop browsers. The layout survives smaller windows
but I didn't design mobile-first.

**Do they have access to the app before their first working day?**

I assumed yes - HR sends the link together with the welcome email. Being
able to read the guide and see who's who *before* day one is where the app
removes the most anxiety. This is also why I didn't add authentication:
nothing in the app is sensitive enough to justify a login wall in v1
(no salaries, no personal data beyond work contacts).

## One assumption I knowingly simplified

The app tracks progress for a single new employee at a time - there are no
user accounts, so the checklist state is global. Meridian hires 2-3 people
per month, so in reality two people could be onboarding at once. I decided
this was acceptable for v1 and documented per-user progress as the next
priority, because building accounts properly would have eaten the time I
needed to finish the three core pages well.