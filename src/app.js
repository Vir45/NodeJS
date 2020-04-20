const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const docLoggerMiddware = require('./middleware/docLoggerMiddleware');
const errorLoggMiddware = require('./middleware/errorLoggMiddleware');
const { handleError } = require('./resources/errorHandler/errorHandler');
const loggerMiddware = require('./middleware/loggerMiddleware');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(
  '/doc',
  swaggerUI.serve,
  docLoggerMiddware,
  swaggerUI.setup(swaggerDocument)
);

app.use('/', loggerMiddware, (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
  next(err);
});

app.use(errorLoggMiddware);

module.exports = app;
