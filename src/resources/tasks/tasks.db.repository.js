const Task = require('./task.model');

const getByBoardId = async data => {
  return Task.find({ boardId: data });
};

const add = async data => {
  return Task.create(data);
};

const getByBoardTaskId = async data => {
  return Task.findOne({ _id: data[1], boardId: data[0] });
};

const put = async data => {
  return Task.updateOne({ _id: data.id, boardId: data.boardId }, data);
};

const delet = async data => {
  return (await Task.deleteOne({ _id: data[1], boardId: data[0] }))
    .deletedCount;
};

const getNull = async params => {
  return Task.updateMany({ userId: params }, { userId: null });
};

const deletForBoards = async data => {
  return Task.deleteMany({ boardId: data });
};
module.exports = {
  add,
  getByBoardId,
  getByBoardTaskId,
  put,
  delet,
  getNull,
  deletForBoards
};
