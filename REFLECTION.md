# Reflection

Honest thoughts about how this project went.

## What turned out to be harder than I expected

Not the code, surprisingly - git. I knew the commands in theory, but
actually working with feature branches, keeping commits small, remembering
to run everything from the project root and not from some subfolder... I
lost time to mistakes that had nothing to do with programming. At one
point I made a commit that included nothing because I ran git add from
the wrong directory and didn't read the output carefully. Lesson learned:
read what the terminal tells you, it's usually literally telling you the
problem.

The other surprise was how much time the "invisible" parts take. The
checklist page - the actual feature - was maybe a third of the work. The
rest was setup, seed data, fixing a blank white page (a missing import),
keeping two servers running, and writing these docs. Tutorials skip all
of that, so I used to think it doesn't count. It counts.

## Which decision would I make differently if I started over

I'd write the documentation as I go instead of leaving most of it for the
end. By the time I wrote DECISIONS.md I had to reconstruct reasoning from
hours before, and I know some of the nuance got lost. The assignment even
hints at this ("work incrementally") and it applies to docs too, not just
commits.

I'd also start smaller on the visual side. I spent time early on making
the checklist look nice before People and the Guide even existed. It
worked out, but it was risk I didn't need to take - a finished ugly app
beats a beautiful unfinished one.

## What did I learn about myself as a developer

That I work much better with a clear, small next step than with a big
open task. "Build an onboarding app" froze me for a while; "make the API
return the task list" did not. Breaking the problem down is not a
nice-to-have for me, it's the only way I actually move.

I also learned that I can cut scope without feeling like I failed. Leaving
out authentication and the admin panel felt wrong at first - like
admitting the app is incomplete. Writing down *why* they're out of scope
changed that: it stopped being "I didn't manage to do it" and became a
decision I can defend. That mental shift was probably the most valuable
thing I got out of this project.

One more honest note: I worked on this in a compressed timeframe, because
my university exam session overlapped with most of the working period. I'd
have loved more time to test with a real user and to polish the details -
but I'd rather submit something finished and honestly documented than
something bigger and half-explained.