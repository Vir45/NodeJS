const logger = require('../logger/logger');

const loggerMiddware = (req, res, next) => {
  logger.info(
    `url: ${req.url}, body: ${JSON.stringify(
      req.body
    )}, params: ${JSON.stringify(req.query)}`
  );
  next();
};

module.exports = loggerMiddware;
