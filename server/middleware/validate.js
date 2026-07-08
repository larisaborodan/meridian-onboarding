function requireIntParam(name) {
  return (req, res, next) => {
    const value = Number(req.params[name]);
    if (!Number.isInteger(value) || value <= 0) {
      return res.status(400).json({ error: `Invalid ${name}: must be a positive integer` });
    }
    req.params[name] = value;
    next();
  };
}

module.exports = { requireIntParam };