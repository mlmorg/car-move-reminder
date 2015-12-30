'use strict';
var console = require('console');
var EventEmitter = require('events').EventEmitter;

var DB = require('./db');
var Emailer = require('./emailer');
var Reminder = require('./models/reminder');

module.exports = App;

function App(config) {
  EventEmitter.call(this);

  this.config = config;
  this.logger = console;
  this.db = new DB(config.db, this.logger);
  this.emailer = new Emailer(config.emailer, this.logger);

  this.db.on('ready', this.onReady.bind(this));
  this.db.on('lost', this.onLost.bind(this));
}

App.prototype.onReady = function onReady() {
  this.Reminder = Reminder(this.db.connection);
  this.emit('ready');
};

App.prototype.onLost = function onLost() {
  this.emit('lost');
};
