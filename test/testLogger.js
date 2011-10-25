require.paths.unshift('../lib','../config');

var logger = require('../lib/logger');
var assert = require('assert');
var fail = [];
var pass = [];
var warn = [];

exports.runTest = function(cb) {
  var count = 0;
  var test = function(name, method, warning) {
    count++;

    try {
      method();
      if (warning) {
        warn.push({test:count, method:name, message:warning});
      } else {
        pass.push({test:count, method:name});
      }
    } catch(e) {
      fail.push({test:count, method:name, exception:e});
    }
  }

  var loggerLevels = ['info', 'warn', 'error', 'emergency', 'alert', 'critical', 'debug', 'notice']

  for (var i = 0; i < loggerLevels.length; i++) {
    test('all logger level \"' + loggerLevels[i] + '\", logs OK! Exception is thrown in event of a failure!', function() {
      try {
        logger[loggerLevels[i]]('Testing logger level ' + loggerLevels[i]);
        //also check log file for current date to ensure that all is logged properly!
      } catch (e) {
        throw(e);
      }
    })
  }

  test('Exception is thrown when logging with level that is not defined!', function() {
    assert.throws(function() {
      logger.foo('foobar');
    });
  });

  cb(fail, warn, pass);
}

this.runTest(function(fail, warn, pass) {
  if (fail.size > 0 ) {
    fail.forEach(function(message) {
      console.log(message);
    })
  }if (warn.size > 0 ) {
    fail.forEach(function(message) {
      console.log(message);
    })
  }if (pass.size > 0 ) {
    fail.forEach(function(message) {
      console.log(message);
    })
  }

})
