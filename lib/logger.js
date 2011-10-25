require('datejs');
var sys = require('sys');
var fs = require('fs');
try {
  var config = require('../../../config/loggerProperties');
} catch(e) {
  config = require('../config')
}
var levels = require('../config/loggerLevels');
var appName = config.appName;
var filename = config.fileLocation + new Date().toString(config.dateFormat);

var Logger = exports;

var timestamp = function() {
  return new Date().toString(config.timestampFormat); //TODO get the timestamp format from config too
}

/*
 calculate the root level and return a value
 so if Info is stated in configuration then only log up to that level and no debug messages will be logged

 @return numerical value representing the log level to be used

 */
var getHighestLevelToLogToo = function(callback) {

  var rootLevel = config.rootLevel;
  if (rootLevel) {
    Object.keys(levels.alertLevels).forEach(function(key) {
      if (levels.alertLevels[key].toLowerCase() === rootLevel.toLowerCase()) {
        callback(null, key);
      }
    });
  }
}

/*
 Go through the alert level JSON object and dynamically create a function which will log data for that alert code
 */
var init = function() {

  getHighestLevelToLogToo(function(error, alertLevelNumber) {

    Object.keys(levels.alertLevels).forEach(function(key) {
      Logger[levels.alertLevels[key].toLowerCase()] = function(message) {

        fs.open(filename, 'a', undefined, function(err, fd) {
          if (err) {
            throw err;
          }
          if (alertLevelNumber && key <= alertLevelNumber) {
            fs.write(fd, config.host + ' [' + timestamp() +
                '] ' + levels.alertLevels[key].toUpperCase() +
                ': ' + appName + ': ' + message + '\n', undefined, undefined,
                function(err, written) {
                  if (err) {
                    throw err;
                  }
//          sys.puts(written + ' bytes written');
                  fs.close(fd, function(err) {
                    if (err) {
                      throw err;
                    }
                  });
                });
          }
        });
      }
    });
  });
}

/*
 Initialize logger
 */
init();

//TODO IMPORTANT - Need to allow for aSync calls which is managed by creating new instance of caller - however, need to throttle access to the log file as all processes log to same log file.
//TODO TCP connection to syslog
//TODO udp connection to syslog