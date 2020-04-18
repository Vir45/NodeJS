const userRepoDB = require('./user.db.repository');
const taskRepoDB = require('../tasks/tasks.db.repository');

const getAll = () => userRepoDB.getAll();

const getId = async params => {
  const result = await userRepoDB.getById(params);
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
  const user = await userRepoDB.add(data);
  return user;
};

const putUser = async (body, params) => {
  if (
    typeof body.name !== 'string' ||
    typeof body.login !== 'string' ||
    typeof body.password !== 'string'
  ) {
    return false;
  }
  await userRepoDB.put(body, params);
  const result = await userRepoDB.getById(params);
  return result;
};

const deletUser = async params => {
  await taskRepoDB.getNull(params);
  const index = await userRepoDB.delet(params);
  if (index < 1) {
    return -1;
  }
  return index;
};

module.exports = { getAll, getId, postUser, putUser, deletUser };
