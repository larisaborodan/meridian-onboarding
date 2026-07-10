const express = require('express');
const db = require('../db');

const router = express.Router();
const { catchErrors } = require('../middleware/errorHandler');
const { requireIntParam } = require('../middleware/validate');


router.get('/', catchErrors((req, res) => {
  const employees = db
    .prepare('SELECT * FROM employees ORDER BY department, name')
    .all();
  res.json(employees);
}));


router.get('/:id/progress', requireIntParam('id'), catchErrors((req, res) => {
  const employee = db.prepare('SELECT id FROM employees WHERE id = ?').get(req.params.id);
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const tasks = db
    .prepare(`
      SELECT t.*, COALESCE(p.completed, 0) AS completed
      FROM onboarding_tasks t
      LEFT JOIN task_progress p
        ON p.task_id = t.id AND p.employee_id = ?
      ORDER BY t.sort_order
    `)
    .all(req.params.id);
  res.json(tasks);
}));


router.patch(
  '/:id/tasks/:taskId/toggle',
  requireIntParam('id'),
  requireIntParam('taskId'),
  catchErrors((req, res) => {
    const employee = db.prepare('SELECT id FROM employees WHERE id = ?').get(req.params.id);
    const task = db.prepare('SELECT id FROM onboarding_tasks WHERE id = ?').get(req.params.taskId);
    if (!employee || !task) {
      return res.status(404).json({ error: 'Employee or task not found' });
    }

    db.prepare(`
      INSERT INTO task_progress (employee_id, task_id, completed)
      VALUES (?, ?, 1)
      ON CONFLICT (employee_id, task_id)
      DO UPDATE SET completed = 1 - completed
    `).run(req.params.id, req.params.taskId);

    const updated = db
      .prepare(`
        SELECT t.*, COALESCE(p.completed, 0) AS completed
        FROM onboarding_tasks t
        LEFT JOIN task_progress p
          ON p.task_id = t.id AND p.employee_id = ?
        WHERE t.id = ?
      `)
      .get(req.params.id, req.params.taskId);
    res.json(updated);
  })
);

module.exports = router;