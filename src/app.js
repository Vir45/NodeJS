const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./logger/logger');
const docLoggerMiddware = require('./middleware/docLoggerMiddleware');
const errorMiddware = require('./middleware/errorMiddleware');
const { handleError } = require('./resources/errorHandler/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(
  '/doc',
  swaggerUI.serve,
  docLoggerMiddware,
  swaggerUI.setup(swaggerDocument)
);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    logger.info(
      `url: ${req.url}, body: ${JSON.stringify(
        req.body
      )}, params: ${JSON.stringify(req.params)}`
    );
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/tasks', taskRouter);

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason.stack);
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

app.use((err, req, res, next) => {
  handleError(err, res);
  next(err);
});

app.use(errorMiddware);

module.exports = app;
