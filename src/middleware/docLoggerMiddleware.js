const logger = require('../logger/logger');

const docLoggerMiddware = (req, res, next) => {
  logger.info(
    `url: /doc, body: ${JSON.stringify(req.body)}, params: ${JSON.stringify(
      req.params
    )}`
  );
  next();
};

module.exports = docLoggerMiddware;
