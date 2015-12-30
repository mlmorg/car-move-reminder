'use strict';
var mongoose = require('mongoose');
var uuid = require('node-uuid');

module.exports = createReminder;

function createReminder(connection, config) {
  var emailWithinTimes = config.emailWithinTimes;
  var emailWithinTimesAmount = emailWithinTimes.length;

  var Reminder = mongoose.Schema({
    _id: {
      type: String,
      default: uuid.v1
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    moveBy: {
      type: Date,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    emailsSent: {
      type: Number,
      default: 0
    }
  });

  Reminder.methods.timeUntilMoveBy = function timeUntilMoveBy() {
    return this.moveBy - Date.now();
  };

  Reminder.methods.datePassed = function datePassed() {
    return Date.now() >= this.moveBy;
  };

  Reminder.methods.dateUpcoming = function dateUpcoming() {
    if (this.emailsSent >= emailWithinTimesAmount) {
      return false;
    }

    var currentEmailWithinTime = emailWithinTimes[this.emailsSent];
    if (this.timeUntilMoveBy() > currentEmailWithinTime) {
      return false;
    }

    return true;
  }

  return connection.model('Reminder', Reminder);
}
