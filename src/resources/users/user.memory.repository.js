const dataUsers = require('../data/data').dataUsers;

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return dataUsers;
};

module.exports = { getAll };
