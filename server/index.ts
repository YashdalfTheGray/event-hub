/// <reference path="../typings/main.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as chalk from "chalk";
import { Events } from "./events";

// Because typscript is being a stupid whiny bitch
var PouchDb = require('pouchdb');

var db = new PouchDb('http://localhost:5984/events');
var app = express();
var iotEvents = new Events('http://localhost:5984/events');

app.use(bodyParser.json());
app.use(morgan(
    ':remote-addr - ' +
    ':remote-user ' +
    '[:date[clf]] ' +
    chalk.cyan('":method ') +
    ':url" ' +
    chalk.green(':status ') +
    ':res[content-length] ' +
    '":referrer" ' +
    chalk.gray('":user-agent"')
));

app.use('/events', iotEvents.router);

app.get('/status', (req, res) => {
    db.info().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error);
    })
});

app.listen(process.argv[2] || 8080);
