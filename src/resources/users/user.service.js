const usersRepo = require('./user.memory.repository');
const dataUsers = require('../data/data').dataUsers;
const dataTasks = require('../data/data').dataTasks;
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getId = async params => {
  const users = await getAll();
  if (typeof params !== 'string') {
    return false;
  }
  const result = await users.find(item => item.id === params);
  return result;
};

const postUser = async data => {
  if (
    typeof data.name !== 'string' ||
    typeof data.login !== 'string' ||
    typeof data.password !== 'string'
  ) {
    return false;
  }
  const user = new User(data);
  dataUsers.push(user);
  return user;
};

const putUser = async (body, params) => {
  const users = await getAll();
  if (
    typeof body.name !== 'string' ||
    typeof body.login !== 'string' ||
    typeof body.password !== 'string'
  ) {
    return false;
  }
  const userForPut = users.find(item => item.id === params);
  const index = users.indexOf(userForPut);
  if (index < 0) return false;
  dataUsers.splice(index, 1, { ...body, ...{ id: params } });
  return { ...body, ...{ id: params } };
};

const deletUser = async params => {
  const users = await getAll();
  const userForDelet = users.find(item => item.id === params);
  const index = users.indexOf(userForDelet);
  if (index < 0) {
    return -1;
  }
  const userId = userForDelet.id;
  dataTasks.forEach(item => {
    if (item.userId === userId) item.userId = null;
  });
  dataUsers.splice(index, 1);
  return index;
};

module.exports = { getAll, getId, postUser, putUser, deletUser };
