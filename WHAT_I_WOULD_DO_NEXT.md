# What I Would Do Next

If I had two more weeks, here's what I'd build, in order.

## Priority 1 - Features that would fundamentally improve the experience

**An admin panel for HR.**
Right now the data lives in a seed script, which means "HR edits the
onboarding" translates to "someone edits JavaScript". That's fine for a
demo and unacceptable for real use. A simple CRUD interface for tasks,
people and FAQ entries would turn this from a prototype into something
Laura could actually own. This is the single highest-value thing missing.

**User accounts and per-employee progress.**
Meridian hires 2-3 people per month, so two people can be onboarding at
the same time - and right now they would share one checklist. Accounts
would mean a proper task_progress table (employee + task + status), a
tiny login, and HR being able to see where each new hire is stuck. This
also unlocks the manager's view: "my new team member is 40% through
week 1."

Accounts also mean taking security seriously: password hashing (bcrypt),
input validation on every endpoint, and locking CORS to the real frontend
origin instead of allowing everything like the demo does now. The current
version has no sensitive data, so the relaxed setup is acceptable - but
the moment per-user data exists, this stops being optional.

These changes go together: the admin panel makes the app maintainable,
the accounts make it correct, and security makes it safe to use for real.

## Priority 2 - Features that would add significant value

**Department-specific onboarding templates.**
A new salesperson and a new developer share maybe half of their tasks.
HR would define a common template plus per-department extras, and the
right checklist gets generated when they add a new hire.

**Real dates instead of phases.**
Day 1 / Week 1 / Month 1 works, but once the app knows your start date,
it can say "this task is due Thursday" and gently highlight overdue items.
Small change, much more personal.

**A Slack touchpoint.**
Meridian lives on Slack. Even a minimal integration - a message to your
buddy's DM from inside the app, or a weekly progress ping - would meet
new hires where they already are.

**Docker setup.**
Right now running the app means two terminals and four commands. A
docker-compose file would reduce it to one command, and would also remove
the "works on my machine" risk - the evaluator (or a future developer)
gets the exact same environment I developed in. I skipped it because the
current setup is already simple, but it's the natural next step before
anyone else touches this code.

## Priority 3 - Nice-to-have improvements and why they still matter

**Search in the People page.** With 200 employees, scrolling stops
working. Search-by-name-or-role is 20 lines of code and saves real time.

**An office map / "where do I go" visual.** The first-day anxiety is
often literally spatial: which floor, which room. A simple annotated map
in the guide would help more than it sounds.

**Mobile layout polish.** The commute to your first day is exactly when
you'd re-read the guide on your phone.

**Feedback collected in-app.** The "give onboarding feedback" task
currently points to a conversation with HR; a small form storing answers
in the database would close the loop and make every onboarding improve
the next one.