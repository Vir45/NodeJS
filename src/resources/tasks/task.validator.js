const data = require('../data/data');

const postValidator = async item => {
  const { title, order, description, boardId } = item;
  // const board = data.dataBoards.find(elem => elem.id === boardId);
  // if (!board) {
  //   return false;
  // }
  // board.columns.find(elements => elements.id === columnId) === undefined
  // data.dataUsers.find(element => element.id === userId) === undefined ||
  //   data.dataBoards.find(elem => elem.id === boardId) === undefined
  if (
    typeof title !== 'string' ||
    typeof order !== 'number' ||
    typeof description !== 'string' ||
    typeof boardId !== 'string'
  ) {
    return false;
  }
  return true;
};

const getByIdBoardValidator = async item => {
  const leng = data.dataBoards.filter(elem => elem.id === item);
  if (leng.length < 1 || typeof item !== 'string') {
    return false;
  }
  return true;
};

const getTasksByBoardIdAndTaskIdValidator = async item => {
  const [boardId, taskId] = item;
  const task = data.dataTasks.find(elem => elem.id === taskId);

  if (!task) {
    return false;
  }

  if (
    data.dataBoards.find(elem => elem.id === boardId) === undefined ||
    data.dataTasks.find(el => el.id === taskId) === undefined ||
    task.boardId !== boardId
  ) {
    return false;
  }

  return true;
};

const putTaskValidator = async item => {
  const { title, order, description, boardId, id } = item;
  // const board = data.dataBoards.find(elem => elem.id === boardId);
  // if (!board) {
  //   return false;
  // }

  // data.dataUsers.find(element => element.id === userId) === undefined ||
  //   data.dataBoards.find(elem => elem.id === boardId) === undefined ||
  //   board.columns.find(elements => elements.id === columnId) === undefined

  if (
    typeof title !== 'string' ||
    typeof order !== 'number' ||
    typeof description !== 'string' ||
    typeof boardId !== 'string' ||
    typeof id !== 'string'
  ) {
    return false;
  }
  return true;
};

const deleteValidator = async item => {
  const [boardId, taskId] = item;
  if (typeof boardId !== 'string' || typeof taskId !== 'string') {
    return false;
  }
  return true;
};

module.exports = {
  postValidator,
  getByIdBoardValidator,
  getTasksByBoardIdAndTaskIdValidator,
  putTaskValidator,
  deleteValidator
};
