'use strict';

module.exports = createLogger;

function createLogger() {
  function Logger() {
    this.logs = [];
  }

  Logger.prototype.info = function info(message) {
    this.logs.push({type: 'info', message: message});
  };

  Logger.prototype.error = function error(message) {
    this.logs.push({type: 'error', message: message});
  };

  return new Logger();
}
