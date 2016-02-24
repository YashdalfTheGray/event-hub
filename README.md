# event-hub
Node application to collect all the IoT events

## getting started
Run `npm install` to pull down all the node dependencies after cloning the directory. The `postinstall` script runs `typings install` which means `typings` has to be available to fetch typescript typings for the dependencies. `typings` can be installed using `npm install -g typings`.

## commands
* Run `npm run start-pouch` to start the PouchDb server.
* Run `npm run clean` to clean the directory. Everything in `.gitignore` and any files that the version control doesn't know about will be deleted. This will also delete the database.
* Run `npm start` to start the application.
* Run `npm test` to run the tape tests.


## Helpful Links

- [PouchDB API](http://pouchdb.com/api.html)
- [Typescript Handbook](http://www.typescriptlang.org/Handbook)
