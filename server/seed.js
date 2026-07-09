const db = require('./db');

db.exec('DELETE FROM task_progress; DELETE FROM employees; DELETE FROM onboarding_tasks; DELETE FROM faq;');

const employees = [
  ['Andrei Pop', 'Engineering Manager', 'Engineering', 'andrei.pop@meridian.com', '@andrei', 1],
  ['Ioana Marinescu', 'Senior Developer', 'Engineering', 'ioana.marinescu@meridian.com', '@ioana', 1],
  ['Radu Dumitrescu', 'Frontend Developer', 'Engineering', 'radu.dumitrescu@meridian.com', '@radu', 0],
  ['Elena Stancu', 'Backend Developer', 'Engineering', 'elena.stancu@meridian.com', '@elena', 0],
  ['Mihai Georgescu', 'QA Engineer', 'Engineering', 'mihai.georgescu@meridian.com', '@mihai', 0],
  ['Cristina Vlad', 'Sales Director', 'Sales', 'cristina.vlad@meridian.com', '@cristina', 0],
  ['Bogdan Ilie', 'Account Executive', 'Sales', 'bogdan.ilie@meridian.com', '@bogdan', 1],
  ['Ana Petrescu', 'Sales Representative', 'Sales', 'ana.petrescu@meridian.com', '@ana', 0],
  ['Diana Munteanu', 'Marketing Lead', 'Marketing', 'diana.munteanu@meridian.com', '@diana', 1],
  ['Vlad Constantin', 'Content Specialist', 'Marketing', 'vlad.constantin@meridian.com', '@vladc', 0],
  ['Simona Radu', 'Social Media Manager', 'Marketing', 'simona.radu@meridian.com', '@simona', 0],
  ['Laura Nistor', 'HR Manager', 'HR', 'laura.nistor@meridian.com', '@laura', 1],
  ['George Barbu', 'Finance Director', 'Finance', 'george.barbu@meridian.com', '@george', 0],
  ['Alina Toma', 'Accountant', 'Finance', 'alina.toma@meridian.com', '@alina', 1],
  ['Stefan Moldovan', 'Financial Analyst', 'Finance', 'stefan.moldovan@meridian.com', '@stefan', 0],
];

const insertEmployee = db.prepare(
  'INSERT INTO employees (name, role, department, email, slack_handle, is_buddy, start_date) VALUES (?, ?, ?, ?, ?, ?, ?)'
);
employees.forEach((e) => insertEmployee.run(...e, '2023-04-10'));

const newHires = [
  ['Larisa Borodan', 'Junior Developer', 'Engineering', 'larisa.borodan@meridian.com', '@larisa', 0, '2026-07-13'],
  ['Alex Ionescu', 'Junior Accountant', 'Finance', 'alex.ionescu@meridian.com', '@alex', 0, '2026-07-01'],
];
newHires.forEach((e) => insertEmployee.run(...e));

const tasks = [
  ['Pick up your laptop and badge', 'Visit Laura from HR (room 204) to collect your equipment and access badge.', 'Setup', 'day1', 1],
  ['Set up your work accounts', 'Activate your Meridian email, then log in to Slack and Google Meet with it.', 'Setup', 'day1', 2],
  ['Join the essential Slack channels', 'Join #general, #announcements and your department channel (e.g. #engineering).', 'Communication', 'day1', 3],
  ['Meet your buddy', 'Your buddy will message you on Slack. Grab a coffee together — they are your go-to person for any question.', 'People', 'day1', 4],
  ['Read the hybrid work policy', 'Meridian works 3 days in the office (Mon, Tue, Thu) and 2 days remote (Wed, Fri).', 'Policies', 'day1', 5],
  ['Set up your development environment', 'Follow the setup guide pinned in #engineering. Ask your buddy if anything fails.', 'Setup', 'week1', 6],
  ['1:1 with your manager', 'A 30-minute intro meeting: expectations, your first tasks, how the team works.', 'People', 'week1', 7],
  ['Intro call with each department', 'Short Google Meet calls with a contact person from Sales, Marketing, HR and Finance.', 'People', 'week1', 8],
  ['Complete the HR paperwork', 'Sign the remaining documents Laura sent you by email.', 'Admin', 'week1', 9],
  ['Ship your first small task', 'Your manager will assign a starter task — the goal is to go through the full team workflow once.', 'Work', 'week1', 10],
  ['Introduce yourself at the all-hands', 'A 2-minute intro at the monthly all-hands on Google Meet. Everyone does it, everyone survives.', 'People', 'month1', 11],
  ['Give onboarding feedback', 'Tell HR what was confusing during your first month — it directly improves this app.', 'Admin', 'month1', 12],
  ['30-day check-in with your manager', 'A retrospective on your first month: what went well, what support you still need.', 'People', 'month1', 13],
  ['Own a task end-to-end', 'By the end of month one you should have a task that is fully yours, from start to finish.', 'Work', 'month1', 14],
];

const insertTask = db.prepare(
  'INSERT INTO onboarding_tasks (title, description, category, due_phase, sort_order) VALUES (?, ?, ?, ?, ?)'
);
tasks.forEach((t) => insertTask.run(...t));

const faqs = [
  ['Which days do I come to the office?', 'Monday, Tuesday and Thursday are office days. Wednesday and Friday are remote.', 'Hybrid work'],
  ['Who do I ask about payroll, contracts or holidays?', 'Laura Nistor (@laura on Slack) — she is our entire HR department, so be patient: she helps ~200 people.', 'HR'],
  ['What tools does Meridian use for communication?', 'Slack for messages, Google Meet for calls. Email is mostly for external communication.', 'Tools'],
  ['What is a buddy?', 'An experienced colleague assigned to every new hire. Ask them anything — no question is too small.', 'People'],
  ['How do I book a meeting room?', 'Through Google Calendar — rooms appear as invitees.', 'Office'],
  ['When do I get paid?', 'Salaries are paid on the last working day of each month.', 'HR'],
];

const insertFaq = db.prepare('INSERT INTO faq (question, answer, category) VALUES (?, ?, ?)');
faqs.forEach((f) => insertFaq.run(...f));

const alex = db.prepare("SELECT id FROM employees WHERE email = 'alex.ionescu@meridian.com'").get();
const insertProgress = db.prepare(
  'INSERT INTO task_progress (employee_id, task_id, completed) VALUES (?, ?, 1)'
);
const alexTaskIds = db
  .prepare('SELECT id FROM onboarding_tasks ORDER BY sort_order LIMIT 6')
  .all();
alexTaskIds.forEach((t) => insertProgress.run(alex.id, t.id));

const count = (table) => db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n;
console.log('Seed complete:');
console.log(`  employees: ${count('employees')}`);
console.log(`  tasks:     ${count('onboarding_tasks')}`);
console.log(`  faq:       ${count('faq')}`);
console.log(`  progress:  ${count('task_progress')}`);