function catchErrors(fn) {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}


function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.status ? err.message : 'Internal server error',
  });
}

module.exports = { catchErrors, errorHandler };