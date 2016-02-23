/// <reference path="../typings/main.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as chalk from "chalk";
import { Events } from "./events";
import { ServerStatus } from "./serverStatus";

const DB_URL = 'http://localhost:5984/events';

var app = express();
var iotEvents = new Events(DB_URL);
var status = new ServerStatus(DB_URL);

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
app.use('/status', status.router);

app.listen(process.argv[2] || 8080);
