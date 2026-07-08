
const express = require('express');
const db = require('../db');

const router = express.Router();
const { catchErrors } = require('../middleware/errorHandler');
const { requireIntParam } = require('../middleware/validate');

router.get('/', catchErrors((req, res) => {
  const tasks = db
    .prepare('SELECT * FROM onboarding_tasks ORDER BY sort_order')
    .all();
  res.json(tasks);
}));


router.patch('/:id/toggle', requireIntParam('id'), catchErrors((req, res) => {
  const result = db
    .prepare('UPDATE onboarding_tasks SET completed = 1 - completed WHERE id = ?')
    .run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const task = db
    .prepare('SELECT * FROM onboarding_tasks WHERE id = ?')
    .get(req.params.id);
  res.json(task);
}));

module.exports = router;