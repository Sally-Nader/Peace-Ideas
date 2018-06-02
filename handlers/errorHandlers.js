exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.render('error', { status: err.status, message: err.message, err });
  next(err);
};


exports.catchErrors = fn => function (req, res, next) {
  return fn(req, res, next).catch(next);
};

