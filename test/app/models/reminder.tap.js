'use strict';
var test = require('tape');

var config = require('../../../config');
var DB = require('../../../app/db');
var createLogger = require('../../helpers/logger');
var createReminderModel = require('../../../app/models/reminder');

test('A reminder model', function t(assert) {
  var logger = createLogger();
  var db = new DB(config.db, logger);
  db.on('ready', function onReady() {
    var Reminder = createReminderModel(db.connection, config.reminder);
    var reminder = new Reminder();
  });
});
