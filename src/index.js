const cluster = require('cluster');
const server = require('./server');
const worker = require('./worker');
const logger = require('./utils/logger');

if (cluster.isMaster) {
  cluster.on('exit', (worker, code, signal) => {
    logger.info(`worker ${worker.process.pid} died. Code ${code}, Signal ${signal}`);
  });
  const worker = cluster.fork();
  server(worker);
} else {
  worker();
}
