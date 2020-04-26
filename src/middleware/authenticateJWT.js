const { ErrorHandler } = require('../resources/errorHandler/errorHandler');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY: secret } = require('../common/config');

const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const result = await jwt.verify(token, secret);
      if (result) {
        next();
        return;
      }
      throw new ErrorHandler(401, 'Unauthorized error');
    }
    throw new ErrorHandler(401, 'Unauthorized error');
  } catch (err) {
    res.status(401).json('Unauthorized error');
  }
};

module.exports = authenticateJWT;
