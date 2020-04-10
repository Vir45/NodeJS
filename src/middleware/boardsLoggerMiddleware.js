const logger = require('../logger/logger');

const loggerMiddware = (req, res, next) => {
  const url = `/boards${req.url}`;
  logger.info(
    `url: ${url}, body: ${JSON.stringify(req.body)}, params: ${JSON.stringify(
      req.params
    )}`
  );
  next();
};

module.exports = loggerMiddware;
