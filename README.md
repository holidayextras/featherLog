#Feather 0.0.1

A light-weight logger facility, Feather integrates seamlessly with your codebase and has minimal overheads.

It uses Unix log levels `[Emergency, Alert, Critical, Error, Warn, Notice, Info, Debug]`, and similarly to logging
facilities like syslog Feather allowes you to define the lowest level to log from and up. This avoids printing out debug
logs in production, for example.
