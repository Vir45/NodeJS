const taskRepo = require('./task.memory.repository');
const dataTasks = require('../data/data').dataTasks;
const Task = require('./task.model');
const taskValidator = require('./task.validator');

const getAll = () => taskRepo.getAll();

const getByBoardId = async () => {};

const postTask = async data => {
  const validator = await taskValidator.postValidator(data);
  if (!validator) {
    return false;
  }
  const newTask = new Task(data);
  dataTasks.push(newTask);
  return newTask;
};

const getTasksByBoardId = async data => {
  const tasks = await getAll();
  const validator = await taskValidator.getByIdBoardValidator(data);
  if (!validator) {
    return false;
  }
  const result = await tasks.filter(item => item.boardId === data);
  return result;
};

const getTasksByBoardIdAndTaskId = async data => {
  const tasks = await getAll();
  const validator = await taskValidator.getTasksByBoardIdAndTaskIdValidator(
    data
  );
  if (!validator) {
    return false;
  }
  const result = await tasks.filter(item => item.id === data[1]);
  return result[0];
};

const putTask = async data => {
  const tasks = await getAll();
  const validator = await taskValidator.putTaskValidator(data);
  if (!validator) {
    return false;
  }
  const { title, order, description, userId, columnId, boardId, id } = data;

  const task = await tasks.find(item => item.id === id);
  const index = tasks.indexOf(task);

  dataTasks[index] = {
    title,
    order,
    description,
    userId,
    columnId,
    boardId,
    id
  };
  return dataTasks[index];
};

const deleteTask = async data => {
  const tasks = await getAll();
  // const validator = await taskValidator.deleteValidator(data);
  // if (!validator) {
  //   return false;
  // }

  const taskForDelet = tasks.find(item => item.id === data[1]);
  if (!taskForDelet) {
    return 'not found';
  }
  const index = tasks.indexOf(taskForDelet);
  dataTasks.splice(index, 1);
  return true;
};

module.exports = {
  getByBoardId,
  postTask,
  getTasksByBoardId,
  getTasksByBoardIdAndTaskId,
  putTask,
  deleteTask
};
