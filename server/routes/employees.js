const express = require('express');
const db = require('../db');

const router = express.Router();
const { catchErrors } = require('../middleware/errorHandler');


router.get('/', catchErrors((req, res) => {
  const employees = db
    .prepare('SELECT * FROM employees ORDER BY department, name')
    .all();
  res.json(employees);
}));

module.exports = router;