#Feather 0.0.1

* A light-weight logger facility, Feather integrates seamlessly with your codebase and has minimal overheads.
* Configurarly control what you log in dev and in production.
* Why? because ogs that are useful during development can be discarded in production.

It uses Unix log levels `[Emergency, Alert, Critical, Error, Warn, Notice, Info, Debug]`, and similarly to logging
facilities like [syslog] (http://www.syslog.org/), Feather allows you to define the highest level to log up too.
This avoids printing out debug logs in production, for example. Or if you want to discard both Info and Debug level logs
you can. This is what loger can do for you.

##Get Feather (if you have node.js and npm installed then skip to the [Main] step below)

Feather runs on node.js. In order to run feather ant the tests first install node. The follwing instructions install node.js on Ubuntu
Linux, other Unix distros may vary. For OSx, Windows or other please find other instructions to follow.

###First install dependencies

    `$ sudo apt-get install g++ libssl-dev apache2-utils`

###If git is not install then do this now

    `$ sudo apt-get install git-core`

###Now node.js can be installed using git

    `$ git clone git://github.com/ry/node.git`

###Now you are ready to configure and compile node.js

    `$ cd node
     $ ./configure
     $ make
     $ sudo make install`

###You will also need to install any depencies.

Defined in package.json are modules on which Feather depends on to run. The easiest way to do this is through npm, which
can be installed following these steps:

* If you do not have curl then get that first:

    `$ sudo apt-get install curl`

* Now you are ready to fetch the npm code

        `$ curl http://npmjs.org/install.sh | sh`

* May be worth taking a look at the [README] (http://npmjs.org/doc/README.html) file.

#Main step below

* Now you are ready to fetch feather
Providing all the above has gone well, you will have all the facilities to do the following to get and try out feather

        `$ git@github.com:holidayextras/feather.git         // fetch the code using git
         $ cd feather                                       // move to Feather dir
         $ npm install                                      // install depencies

* Functions provided by feather are:

        `var logger = require('feather');`

        `logger.emergency('emergency message');
         logger.alert('alert message);
         logger.critical('critical error message');
         logger.error('error message');
         logger.warn('warn message');
         logger.notice('notice message');
         logger.info('info message');
         logger.debug('data data');`

#Run tests

Now you can run the tests. Chenge the rootLogger node in config/loggerProperties.js configuration and run the tests again.
Have a play and feed back to me at <viktor.trako@holidayextras.com>.

    $ node test/testLogger.js                          // run tests`

#Set up

* Feather looks for a featherProperties.js in config directory in your app directory. If it cannot find one then it will
use its default configuration file in feather/config/featherProperties.

* Taking a look inside feather/config/featherProperties:

    `module.exports = {
        "fileLocation": "logs/feather/",
        "appName": "Feather",
        "timestampFormat" : "ddd, dd MMM yyyy HH:mm:ss",
        "dateFormat" : "yyyyMMdd",
        "host" : '172.0.0.1',
        "rootLevel" : "Info"
     }`

 This is a good example of the properties set. Whatever value the rootLevel node is set to then nothing below that
 value will be loged. In the instance above where `[info]` is set, all log messages will be loged apart from `[debug]`
 messages. If `[warn]` is assigned to rootLevel then `[notice]`, `[info]`, and `[debug]` messages throughout your
 codebase will be ignored.