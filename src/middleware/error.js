function errorsMiddleware(err, req, res, next) {
  console.log('[Errors middleware]:\n', err.stack, err.message);
  res.status(500).send({ success: false, msg: err.message });
}

module.exports = errorsMiddleware;
