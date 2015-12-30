'use strict';

module.exports = {
  worker: {
    interval: 1000 * 60 * 30, // 30 minutes
  },
  db: {
    url: 'mongodb://localhost/car-move-reminder'
  },
  emailer: {
    key: '12345',
    fromEmail: 'foo@bar.com',
    toEmails: ['foo1@bar.com', 'foo2@bar.com'],
    emailTypes: {
      datePassed: {
        subject: '',
        body: ''
      },
      dateUpcoming: {
        subject: '',
        body: ''
      }
    }
  },
  reminder: {
    emailWithinTimes: [
      1000 * 60 * 60 * 24, // 24 hours
      1000 * 60 * 60 * 2 // 2 hours
    ]
  }
};
