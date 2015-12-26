'use strict';
var postmark = require('postmark');

module.exports = Emailer;

function Emailer(config, logger, client) {
  this.client = client || new postmark.Client(config.key);
  this.logger = logger;
  this.fromEmail = config.fromEmail;
  this.toEmails = config.toEmails;
  this.emailTypes = config.emailTypes;
}

Emailer.prototype.send = function send(type, reminder) {
  if (!emailTypes[type]) {
    var error = new Error('No email of type: ' + type);
    return this.logger.error(error);
  }

  var self = this;
  this.toEmails.forEach(function sendEmail(toEmail) {
    self.client.sendEmail({
      "From": self.fromEmail,
      "To": toEmail,
      "Subject": emailTypes[type].subject,
      "TextBody": emailTypes[type].body
    });
  });
};
