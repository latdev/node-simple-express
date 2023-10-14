const pino = require('pino');

const logger = pino();

module.exports = function getLogger() {
  return logger;
};
