const mongoose = require('mongoose');
const { MONGO_URL } = require('./config');

async function init() {
  return mongoose.connect(MONGO_URL, {
    'useNewUrlParser': true,
    'useFindAndModify': false,
    'useCreateIndex': true,
    'useUnifiedTopology': true,
    //'autoIndex': false,
  });
}

async function disconnect() {
  return mongoose.disconnect();
}

module.exports = {
  init,
  disconnect
};
