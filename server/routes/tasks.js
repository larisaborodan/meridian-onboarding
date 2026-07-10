const express = require('express');
const db = require('../db');

const router = express.Router();
const { catchErrors } = require('../middleware/errorHandler');


router.get('/', catchErrors((req, res) => {
  const tasks = db
    .prepare('SELECT * FROM onboarding_tasks ORDER BY sort_order')
    .all();
  res.json(tasks);
}));

module.exports = router;