const userRepoDB = require('../users/user.db.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY: secret } = require('../../common/config');

const userAuthentication = async params => {
  const { login, password } = params;
  const userDB = await userRepoDB.getUserForaAthentication(login);
  if (userDB === null) {
    return false;
  }
  const { password: hash, _id } = userDB;
  const match = await bcrypt.compare(password, hash);
  if (match) {
    const payload = { userId: _id, userLogin: login };
    const token = await jwt.sign(payload, secret);
    return { token };
  }
  return false;
};

module.exports = { userAuthentication };
