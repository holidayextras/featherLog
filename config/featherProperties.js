/**
 *  properties that can be set are as follows
 *
 *  fileLocation          (required)                             - the path to where the log files should be written too
 *  appName            (optional)                              - this is to help distinguish between different app logs - this will be more useful when feather is able to write to system-wide logs via syslog or rsyslog
 *  timestampFormat (optional / recommend using) - this is the date format appearing in the log file. The one used here is apache style and is widely used.
 *  dateFormat          (required)                             - this is how the file name will appear as feather uses this to create the file name. Again, this conforms with current convention so I recommend not changing it
 *  host                    (optional)                               - this is the host and again it will be useful when feather writes to system log facilities such as syslog
 *  rootLevel             (optional)                               - if set then only logs up to that level will be logged, others will be ignored.
 */

module.exports = {
  "fileLocation": "logs/feather/",
  "appName": "Feather",
  "timestampFormat" : "ddd, dd MMM yyyy HH:mm:ss",
  "dateFormat" : "yyyyMMdd",
  "host" : '172.0.0.1',
  "rootLevel" : "Warn"
}