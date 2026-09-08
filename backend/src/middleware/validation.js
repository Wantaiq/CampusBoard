function validation(body, params) {
  return async function (req, res, next) {
    try {
      if (body) {
        const bodyValues = await body.validateAsync(req.body || {});
        req.body = bodyValues;
      }

      if (params) {
        const paramValues = await params.validateAsync(req.params || {});
        req.params = paramValues;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = validation;
