require('datejs');
var GLOBAL_CONFIG = '../../../config/featherProperties'
var sys = require('sys');
var fs = require('fs');
try { // Try loading configuration from the user application level
  var config = require(GLOBAL_CONFIG);
} catch(e) { // if one does not exist then use the one set here
  config = require('../config')
}
var levels = require('../config/loggerLevels');
var appName = config.appName;
var filename = config.fileLocation + new Date().toString(config.dateFormat);

var Logger = exports;

var timestamp = function() {
  return new Date().toString(config.timestampFormat); //TODO get the timestamp format from config too
}

/**
 * calculate the root level and return a value
 * so if Info is stated in configuration then only log up to that level and no debug messages will be logged
 *
 * @return numerical value representing the log level to be used
 *
 * @param callback function
 */
var getHighestLevelToLogToo = function(callback) {
  var rootLevel = config.rootLevel;
  if (rootLevel) {
    Object.keys(levels.alertLevels).forEach(function(key) {
      if (levels.alertLevels[key].toLowerCase() === rootLevel.toLowerCase()) {
        callback(null, key);
      }
    });
  } else { // log everything
    Object.keys(levels.alertLevels).forEach(function(key) {
      if(levels.alertLevels[key].toLowerCase() === "debug") {
        callback(null, key);
      }
    })
  }
}

/**
 * Check if a given directory exists and if not, create it so feather can start logging
 *
 */
var createRequiredDirectory = function() {
  var dirPath = '';
  var dirs = config.fileLocation.split('/'); // get individual dirs from the give location in the config file.

  for(var i = 0; i < dirs.length; i++) {
    if(dirs[i] != '') {
      dirPath += (dirs[i] + '/');
      try {
        if(!fs.lstatSync(dirPath)) { // check to see if directory already exists
          fs.mkdirSync(dirPath, '0755'); // if not then create it
        }
      } catch(error) {
        throw 'Failed to create directory ' + dirPath;
      }

    }
  }
}

/**
 * Go through the alert level JSON object and dynamically create a function which will log data for that alert code
 */
var init = function() {

  createRequiredDirectory();
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

/**
 *  Initialize logger
 */
init();

/**
 * Tackle the following in order
 */

//TODO - Create directories as required [DONE]
//TODO - to read configuration from app level conf file.
//TODO - Branch and rename to featherLog
//TODO - allow log file locking so that one process can write to it at any one time. ~ careful that it does not slow things down though
//TODO - start() stop() to yield time between the two
//TODO - TCP / UDP connection 