const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

const taskService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponseBoard));
});

router.route('/:boardId').get(async (req, res) => {
  const result = await boardService.getId(req.params['boardId']);
  if (result === false) {
    return res.status(401).send('Access token is missing or invalid');
  }
  if (!result) return res.status(404).send('Board not found');
  res.json(Board.toResponseBoard(result));
});

router.route('/').post(async (req, res) => {
  // if (!req.body) return res.sendStatus(400);
  const result = await boardService.postBoard(req.body);
  res.setHeader('Content-Type', 'application/json');
  if (!result) {
    return await res.status(401).send('Access token is missing or invalid');
  }
  return await res.status(200).json(Board.toResponseBoard(result));
});

router.route('/:boardId').put(async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const result = await boardService.putBoard(req.body, req.params['boardId']);
  res.setHeader('Content-Type', 'application/json');
  if (!result) {
    return res.status(401).send('Access token is missing or invalid');
  }
  return res.status(200).json(Board.toResponseBoard(result));
});

router.route('/:boardId').delete(async (req, res) => {
  const result = await boardService.deletBoard(req.params['boardId']);
  res.setHeader('Content-Type', 'application/json');
  if (result === false) {
    return res.status(401).json('Access token is missing or invalid');
  }
  if (result === 'not found') {
    return await res.status(404).json('board not found');
  }
  return await res.status(200).json('The board has been deleted');
});

router.route('/:boardId/tasks').post(async (req, res) => {
  if (!req.body) return res.sendStatus(404);
  const { title, order, description, userId, columnId } = req.body;
  let { boardId } = req.body;
  boardId = req.params['boardId'];
  const result = await taskService.postTask({
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  });
  res.setHeader('Content-Type', 'application/json');
  if (!result) {
    return res.status(401).json('Access token is missing or invalid');
  }
  return res.status(200).json(result);
});

router.route('/:boardId/tasks').get(async (req, res) => {
  // if (!req.body) return res.sendStatus(404);
  const result = await taskService.getTasksByBoardId(req.params['boardId']);
  if (!result) {
    return await res.status(401).send('Access token is missing or invalid');
  }
  res.setHeader('Content-Type', 'application/json');
  await res.json(result);
});

router.route('/:boardId/tasks/:taskid').get(async (req, res) => {
  if (!req.body) return res.sendStatus(404);
  const parametrs = [req.params['boardId'], req.params.taskid];
  const result = await taskService.getTasksByBoardIdAndTaskId(parametrs);
  if (!result) {
    return res.status(401).send('Access token is missing or invalid');
  }
  await res.json(result);
});

router.route('/:boardId/tasks/:taskid').put(async (req, res) => {
  if (!req.body) return res.sendStatus(404);
  const { title, order, description, userId, columnId } = req.body;
  let { boardId, id } = req.body;
  boardId = req.params['boardId'];
  id = req.params.taskid;
  const result = await taskService.putTask({
    title,
    order,
    description,
    userId,
    columnId,
    boardId,
    id
  });
  if (!result) {
    return res.status(401).send('Access token is missing or invalid');
  }
  await res.json(result);
});

router.route('/:boardId/tasks/:taskid').delete(async (req, res) => {
  if (!req.body) return res.sendStatus(404);
  const parametrs = [req.params['boardId'], req.params.taskid];
  const result = await taskService.deleteTask(parametrs);
  res.setHeader('Content-Type', 'application/json');
  if (result === false) {
    return res.status(401).json('Access token is missing or invalid');
  }
  if (result === 'not found') {
    return await res.status(404).json('Task not found');
  }
  return await res.status(200).json('The task has been deleted');
});
module.exports = router;
