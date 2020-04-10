const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler, handleError } = require('../errorHandler/errorHandler');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.setHeader('Content-Type', 'application/json');
    res.json(users.map(User.toResponse));
  } catch (err) {
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

// FOR TESTING unhandledRejection

// router.route('/').get(async (req, res, next) => {
//   // const users = await usersService.getAll();
//   const users = await Promise.reject(new Error('Oopps'));
//   res.setHeader('Content-Type', 'application/json');
//   res.json(users.map(User.toResponse));
//   next();
// });

router.route('/:userId').get(async (req, res, next) => {
  try {
    const result = await usersService.getId(req.params['userId']);
    if (!result) {
      throw new ErrorHandler(404, 'User not found');
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(User.toResponse(result));
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const result = await usersService.postUser(req.body);
    res.setHeader('Content-Type', 'application/json');
    if (!result) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    return await res.status(200).json(User.toResponse(result));
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:userId').put(async (req, res, next) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const result = await usersService.putUser(req.body, req.params['userId']);
    if (!result) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    return res.status(200).json(User.toResponse(result));
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:userId').delete(async (req, res, next) => {
  try {
    const index = await usersService.deletUser(req.params['userId']);
    if (index < 0) {
      throw new ErrorHandler(404, 'User not found');
    }
    return res.status(204).send('The user has been deleted');
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

module.exports = router;
