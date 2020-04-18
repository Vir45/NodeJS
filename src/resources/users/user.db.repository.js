const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const add = async user => {
  return User.create(user);
};

const put = async (body, params) => {
  return User.updateOne({ _id: params }, body);
};

const delet = async params => {
  return (await User.deleteOne({ _id: params })).deletedCount;
};

module.exports = { getAll, add, getById, put, delet };
