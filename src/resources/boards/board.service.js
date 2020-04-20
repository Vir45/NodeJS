const boardRepoDB = require('./board.db.repository');
const taskRepoDB = require('../tasks/tasks.db.repository');

const getAll = () => boardRepoDB.getAll();

const getId = async params => {
  if (typeof params !== 'string') {
    return false;
  }
  const result = await boardRepoDB.getById(params);
  if (result === null) {
    return 'not found';
  }
  return result;
};

const postBoard = async data => {
  if (typeof data.title !== 'string' || !Array.isArray(data.columns)) {
    return false;
  }
  const board = await boardRepoDB.add(data);
  return board;
};

const putBoard = async (body, params) => {
  await boardRepoDB.put(body, params);
  return await boardRepoDB.getById(params);
};

const deletBoard = async params => {
  if (typeof params !== 'string') {
    return false;
  }
  await taskRepoDB.deletForBoards(params);
  const index = await boardRepoDB.delet(params);
  if (index < 1) {
    return 'not found';
  }
  return index;
};

module.exports = { getAll, getId, postBoard, putBoard, deletBoard };
