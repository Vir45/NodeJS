class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.setHeader('Content-Type', 'application/json');
  res.status(statusCode).json(message);
};

module.exports = {
  ErrorHandler,
  handleError
};
