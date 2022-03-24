const db = require('./db');
const logger = require('./utils/logger');

module.exports = async function () {
  await db.init();
  logger.info(`Start worker on pid ${process.pid}`);
}
