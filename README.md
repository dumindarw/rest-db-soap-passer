## Description

mobile app back-end REST service and proxy service for SOAP services.

## Functions

* Provide REST API for mobile.
* Store temporary records in MONGO DB.
* Pass data to SOAP client.
* Maintain a log file.

## API Reference

API reference...

## Migrations

use insuassessor

db.createUser(
  {
    user: "insuuser",
    pwd: "12345678",
    roles: [
       { role: "readWrite", db: "insuassessor" }
    ]
  }
)

mongo --port 27017 -u "insuuser" -p "12345678" --authenticationDatabase "insuassessor"

## Tests

No tests yet.

## Author

Duminda Wanninayake

## Install service

"C:\NSSM\nssm64.exe" install InsuranceMBAAS "C:\nodejs\node.exe" \"C:\Users\duminda\node-workspace\insu-service\index.js\"

##Log file location
C:\nodejs\insu.log
