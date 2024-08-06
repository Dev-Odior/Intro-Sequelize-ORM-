function errorsMiddleware(err, req, res, next) {
  console.error('[Errors middleware]:\n', err.stack);
  res.status(500).send({ success: false, msg: err.message });
}

module.exports = errorsMiddleware;
