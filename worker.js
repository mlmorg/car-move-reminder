'use strict';
var App = require('./app');
var config = require('./config');

main();

function main() {
  var app = new App(config);

  app.logger.info('Starting up worker with config', config);

  app.on('ready', function onReady() {
    app.logger.info('Worker running on interval', config.worker.interval);

    // Start running worker on interval
    setInterval(worker.bind(null, app), config.worker.interval);

    // Also run immediately
    worker(app);
  });
}

function worker(app) {
  app.logger.info('Worker loading latest reminder');
  app.getLatestReminder(function onReminder(err, reminder) {
    if (err) {
      return app.logger.error(err);
    }

    app.logger.info('Worker loaded latest reminder', reminder);

    if (!reminder || reminder.datePassed()) {
      return app.datePassed(reminder);
    }

    if (reminder.dateUpcoming()) {
      return app.dateUpcoming(reminder);
    }
  });
}
