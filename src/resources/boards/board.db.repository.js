const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async params => {
  return Board.findOne({ _id: params });
};

const add = async data => {
  return Board.create(data);
};

const put = async (body, params) => {
  return Board.updateOne({ _id: params }, body);
};

const delet = async params => {
  return (await Board.deleteOne({ _id: params })).deletedCount;
};

module.exports = { getAll, add, getById, put, delet };
