const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.setHeader('Content-Type', 'application/json');
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const result = await usersService.getId(req.params['userId']);
  if (!result) {
    return res.status(404).send('User not found');
  }
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(User.toResponse(result));
  // return res.status(200).send('Successful operation');
});

router.route('/').post(async (req, res) => {
  // if (!req.body) return res.sendStatus(400);
  try {
    const result = await usersService.postUser(req.body);
    res.setHeader('Content-Type', 'application/json');
    if (!result) {
      return await res.status(401).send('Access token is missing or invalid');
    }
    return await res.status(200).json(User.toResponse(result));
  } catch (err) {
    console.log(err);
  }
});

router.route('/:userId').put(async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  res.setHeader('Content-Type', 'application/json');
  const result = await usersService.putUser(req.body, req.params['userId']);
  if (!result) {
    return res.status(401).send('Access token is missing or invalid');
  }
  return res.status(200).json(User.toResponse(result));
});

router.route('/:userId').delete(async (req, res) => {
  // if (!req.body) return res.sendStatus(400);
  const index = await usersService.deletUser(req.params['userId']);
  if (index < 0) {
    return res.status(404).send('User not found');
  }
  return res.status(204).send('The user has been deleted');
});

module.exports = router;

// router.route('/').post(async (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   const users = await usersService.getAll();
//   const user = new User(req.body);
//   users.push(user);
// });

// router.route('/:userId').put(async (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   const users = await usersService.getAll();
//   const userForPut = users.find(item => item.id === req.params['userId']);
//   const index = users.indexOf(userForPut);
//   if (index < 0) return res.sendStatus(401);
//   users.splice(index, 1, { ...req.body, ...{ id: req.params['userId'] } });
//   res.json(User.toResponse(users[index]));
// });

// router.route('/:userId').delete(async (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   const users = await usersService.getAll();
//   const userForPut = users.find(item => item.id === req.params['userId']);
//   const index = users.indexOf(userForPut);
//   if (index < 0) {
//     res.sendStatus(404);
//     return;
//   }
//   users.splice(index, 1);
//   res.sendStatus(204);
// });
