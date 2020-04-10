const { createLogger, format, transports } = require('winston');
const path = require('path');

const filename = path.join(__dirname, 'info.log');
const errorName = path.join(__dirname, 'error.log');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: errorName,
      level: 'error',
      format: format.combine(
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.uncolorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          info =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      )
    }),
    new transports.File({
      filename,
      level: 'info',
      format: format.combine(
        format.uncolorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info =>
          JSON.stringify({
            time: info.timestamp,
            level: info.level,
            message: info.message
          })
        )
      )
    })
  ]
});

module.exports = logger;
