const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
// const loggerMiddware = require('../../middleware/boardsLoggerMiddleware');
const { ErrorHandler, handleError } = require('../errorHandler/errorHandler');

const taskService = require('../tasks/task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards.map(Board.toResponseBoard));
  } catch (err) {
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  try {
    const result = await boardService.getId(req.params['boardId']);
    if (result === false) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    if (!result) {
      throw new ErrorHandler(404, 'Board not found');
    }
    res.json(Board.toResponseBoard(result));
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
    const result = await boardService.postBoard(req.body);
    res.setHeader('Content-Type', 'application/json');
    if (!result) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    return await res.status(200).json(Board.toResponseBoard(result));
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  try {
    const result = await boardService.putBoard(req.body, req.params['boardId']);
    res.setHeader('Content-Type', 'application/json');
    if (!result) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    return res.status(200).json(Board.toResponseBoard(result));
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  try {
    const result = await boardService.deletBoard(req.params['boardId']);
    res.setHeader('Content-Type', 'application/json');
    if (result === false) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    if (result === 'not found') {
      throw new ErrorHandler(404, 'Board not found');
    }
    return await res.status(200).json('The board has been deleted');
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  try {
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
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:boardId/tasks').get(async (req, res, next) => {
  try {
    const result = await taskService.getTasksByBoardId(req.params['boardId']);
    if (!result) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    res.setHeader('Content-Type', 'application/json');
    await res.json(result);
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:boardId/tasks/:taskid').get(async (req, res, next) => {
  try {
    const parametrs = [req.params['boardId'], req.params.taskid];
    const result = await taskService.getTasksByBoardIdAndTaskId(parametrs);
    if (!result) {
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    await res.json(result);
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:boardId/tasks/:taskid').put(async (req, res, next) => {
  try {
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
      throw new ErrorHandler(401, 'Access token is missing or invalid');
    }
    await res.json(result);
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});

router.route('/:boardId/tasks/:taskid').delete(async (req, res, next) => {
  try {
    const parametrs = [req.params['boardId'], req.params.taskid];
    const result = await taskService.deleteTask(parametrs);
    res.setHeader('Content-Type', 'application/json');

    if (result === 'not found') {
      throw new ErrorHandler(404, 'Task not found');
    }
    return await res.status(200).json('The task has been deleted');
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return await handleError(err, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
    return;
  }
});
module.exports = router;
