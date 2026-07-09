const express = require('express');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');
const employeesRouter = require('./routes/employees');
const faqRouter = require('./routes/faq');
const { errorHandler } = require('./middleware/errorHandler');
const app = express();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    message: 'Meridian Onboarding API',
    endpoints: ['/api/tasks', '/api/employees', '/api/faq'],
  });
});

app.use('/api/tasks', tasksRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/faq', faqRouter);

const PORT = 3001;
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Meridian API running on http://localhost:${PORT}`);
});