const HEADER = 'x-complispace-site';

function buildMiddleware({required}) {
  return function SiteCodeMiddleware(req, res, next) {
    req.siteCode = req.headers[HEADER];

    if (!req.siteCode && required) {
      return next(new Error(`${req.method} ${req.originalUrl} requires site code but request doesn\'t include ${HEADER} header`));
    }

    next();
  }
}

module.exports = {
  optional: () => buildMiddleware({ required: false }),
  required: () => buildMiddleware({ required: true }),
}
