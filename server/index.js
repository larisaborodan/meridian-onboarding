// index.js — Express API server for the Meridian onboarding app
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// --- Onboarding tasks ---
app.get('/api/tasks', (req, res) => {
  const tasks = db
    .prepare('SELECT * FROM onboarding_tasks ORDER BY sort_order')
    .all();
  res.json(tasks);
});

// Toggle a task between done / not done
app.patch('/api/tasks/:id/toggle', (req, res) => {
  const result = db
    .prepare('UPDATE onboarding_tasks SET completed = 1 - completed WHERE id = ?')
    .run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const task = db.prepare('SELECT * FROM onboarding_tasks WHERE id = ?').get(req.params.id);
  res.json(task);
});

// --- People directory ---
app.get('/api/employees', (req, res) => {
  const employees = db
    .prepare('SELECT * FROM employees ORDER BY department, name')
    .all();
  res.json(employees);
});

// --- FAQ ---
app.get('/api/faq', (req, res) => {
  const faq = db.prepare('SELECT * FROM faq ORDER BY category').all();
  res.json(faq);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Meridian API running on http://localhost:${PORT}`);
});