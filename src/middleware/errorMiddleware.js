const logger = require('../logger/logger');

const errorMiddware = (err, req, res, next) => {
  logger.error(err.stack);
  next();
};

module.exports = errorMiddware;
