#Feather 0.0.1

A light-weight logger facility, Feather integrates seamlessly with your codebase and has minimal overheads.

It uses Unix log level types which are defined the configuration file, and similarly to logging facilities like syslog
Feather allowes you to define the lowest level to log from and up. This avoids printing out debug logs in production, for
example.
