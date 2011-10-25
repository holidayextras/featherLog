#Feather 0.0.1

A light-weight logger facility, Feather integrates seamlessly with your codebase and has minimal overheads.

It uses Unix log levels `[Emergency, Alert, Critical, Error, Warn, Notice, Info, Debug]`, and similarly to logging
facilities like syslog Feather allowes you to define the lowest level to log from and up. This avoids printing out debug
logs in production, for example.

##Run tests

Feather runs on node.js. In order to run tests first install node. The follwing instructions install node.js on Ubuntu
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

* Now you are ready to fetch feather
Providing all the above has gone well, you will have all the facilities to do the following to get and try out feather

        `$ git@github.com:holidayextras/feather.git         // fetch the code using git
         $ cd feather                                       // move to Feather dir
         $ npm install                                      // install depencies
         $ node test/testLogger.js                          // run tests`
