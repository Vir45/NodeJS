const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const bcrypt = require('bcrypt');
const userRepoDB = require('..//resources/users/user.db.repository');

const user = new User({ name: 'admin', login: 'admin', password: 'admin' });

async function createUser(data) {
  let { password } = data;
  const { name, login } = data;
  const hash = await bcrypt.hash(password, 10);
  password = hash;
  await userRepoDB.add({ password, name, login });
}

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('MONgose start');
    createUser(user);
    db.dropDatabase();

    cb();
  });
};

module.exports = { connectToDB };
