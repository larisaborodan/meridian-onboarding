// db.js — opens the SQLite database and creates the schema on first run
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'meridian.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT NOT NULL,
    slack_handle TEXT NOT NULL,
    is_buddy INTEGER NOT NULL DEFAULT 0,
    start_date TEXT NOT NULL DEFAULT '2020-01-01'
  );

  CREATE TABLE IF NOT EXISTS onboarding_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    why TEXT,
    category TEXT NOT NULL,
    due_phase TEXT NOT NULL CHECK (due_phase IN ('day1', 'week1', 'month1')),
    sort_order INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS task_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL REFERENCES employees(id),
    task_id INTEGER NOT NULL REFERENCES onboarding_tasks(id),
    completed INTEGER NOT NULL DEFAULT 0,
    UNIQUE (employee_id, task_id)
  );

  CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL
  );
`);

module.exports = db;