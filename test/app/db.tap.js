'use strict';
var EventEmitter = require('events').EventEmitter;
var extend = require('xtend');
var test = require('tape');

var config = require('../../config');
var createLogger = require('../helpers/logger');
var DB = require('../../app/db');

test('instantiating db', runTest(function t(assert, state) {
  assert.equal(state.mongoose.url, config.db.url,
    'passes the mongoose url correctly');
  assert.ok(state.db.connection instanceof EventEmitter,
    'exports the connection at db.connection');
  assert.end();
}));

test('on db connection', runTest(function t(assert, state) {
  assert.plan(2);

  state.db.on('ready', function onReady() {
    assert.pass('emits a `ready` event');
  });

  state.mongoose.connection.emit('connected');

  assert.equal(state.logger.logs.length, 1,
    'logs the connection change');
}));

test('on db error', runTest(function t(assert, state) {
  state.mongoose.connection.emit('error');

  assert.equal(state.logger.logs.length, 1,
    'logs the error');
  assert.end();
}));

test('on db close', runTest(function t(assert, state) {
  state.mongoose.connection.emit('close');

  assert.equal(state.logger.logs.length, 1,
    'logs the close');
  assert.end();
}));

test('on db disconnection', runTest(function t(assert, state) {
  assert.plan(2);

  state.db.on('lost', function onLost() {
    assert.pass('emits a `lost` event');
  });

  state.mongoose.connection.emit('disconnected');

  assert.equal(state.logger.logs.length, 1,
    'logs the disconnection');
}));

function runTest(testFn) {
  return function runTestFn(assert) {
    var mongoose = createMongoose();
    var logger = createLogger();

    var dbConfig = extend(config.db, {mongoose: mongoose});
    var db = new DB(dbConfig, logger);

    testFn(assert, {
      mongoose: mongoose,
      logger: logger,
      db: db
    });
  };
}

function createMongoose() {
  var mongoose = {
    createConnection: createConnection
  };
  return mongoose;

  function createConnection(url) {
    mongoose.url = url;
    mongoose.connection = new EventEmitter();
    return mongoose.connection;
  }
}
