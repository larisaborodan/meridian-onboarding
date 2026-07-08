const express = require('express');
const db = require('../db');

const router = express.Router();
const { catchErrors } = require('../middleware/errorHandler');

router.get('/', catchErrors((req, res) => {
  const faq = db.prepare('SELECT * FROM faq ORDER BY category').all();
  res.json(faq);
}));

module.exports = router;