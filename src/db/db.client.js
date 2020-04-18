const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

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
    db.dropDatabase();
    cb();
  });
};

module.exports = { connectToDB };
