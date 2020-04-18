const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./logger/logger');
// const fs = require('fs');
// const path = require('path');
const { connectToDB } = require('./db/db.client');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason.stack);
  console.error(`Unhandled rejection detected: ${reason.message} ${promise}`);
});

process.on('uncaughtException', error => {
  console.error(`captured error: ${error.message}`);
  // const pathForErrorLogger = path.resolve('src', 'logger', 'error.log');
  logger.error(error.stack);
  // fs.writeFileSync(pathForErrorLogger, error.stack);
  // process.exit(1);
});
