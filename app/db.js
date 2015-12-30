'use strict';
var EventEmitter = require('events').EventEmitter;
var mongoose = require('mongoose');

module.exports = DB;

function DB(config, logger) {
  EventEmitter.call(this);

  var mongooseLib = config.mongoose || mongoose;
  this.connection = mongooseLib.createConnection(config.url);
  this.logger = logger;

  this.connection.on('connected', this.onConnected.bind(this));
  this.connection.on('error', this.onError.bind(this));
  this.connection.on('close', this.onClose.bind(this));
  this.connection.on('disconnected', this.onDisconnected.bind(this));
}

DB.prototype = Object.create(EventEmitter.prototype);

DB.prototype.onConnected = function onConnected() {
  this.logger.info('Mongoose connected');
  this.emit('ready');
};

DB.prototype.onError = function onError(err) {
  this.logger.error('Mongoose error', err);
};

DB.prototype.onClose = function onClose(str) {
  this.logger.error('Mongoose close', str);
}

DB.prototype.onDisconnected = function onDisconnected() {
  this.logger.error('Mongoose disconnected');
  this.emit('lost');
}
