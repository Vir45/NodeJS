const router = require('express').Router();
const { ErrorHandler, handleError } = require('../errorHandler/errorHandler');
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.userAuthentication(req.body);
    if (token) {
      return await res.status(200).json(token);
    }
    throw new ErrorHandler(403, 'Forbidden');
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

module.exports = router;
