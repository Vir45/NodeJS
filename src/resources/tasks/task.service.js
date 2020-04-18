const Task = require('./task.model');
const taskValidator = require('./task.validator');
const taskRepoDB = require('./tasks.db.repository');

const postTask = async data => {
  const validator = await taskValidator.postValidator(data);
  if (!validator) {
    return false;
  }
  const newTask = await taskRepoDB.add(data);
  return Task.toResponse(newTask);
};

const getTasksByBoardId = async data => {
  const arrOfTask = await taskRepoDB.getByBoardId(data);
  const result = arrOfTask.map(item => Task.toResponse(item));
  return result;
};

const getTasksByBoardIdAndTaskId = async data => {
  const result = await taskRepoDB.getByBoardTaskId(data);
  if (result === null) {
    return 'not found';
  }
  return Task.toResponse(result);
};

const putTask = async data => {
  const validator = await taskValidator.putTaskValidator(data);
  if (!validator) {
    return false;
  }
  const result = await taskRepoDB.put(data);
  return Task.toResponse(result);
};

const deleteTask = async data => {
  const index = await taskRepoDB.delet(data);
  if (index < 1) {
    return -1;
  }
  return index;
};

module.exports = {
  postTask,
  getTasksByBoardId,
  getTasksByBoardIdAndTaskId,
  putTask,
  deleteTask
};
