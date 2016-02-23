"use strict";
/// <reference path="../typings/main.d.ts" />

import { Router } from "express";
import { PouchDriver, PouchDocument } from "./pouchDriver";
import { ServerModule } from "./serverModule";

export class IotEventId {
    docType: string;
    deviceType: string;
    timeSinceEpoch: Number;

    constructor(docType: string, deviceType: string, time: Number) {
        this.docType = docType;
        this.deviceType = deviceType;
        this.timeSinceEpoch = time;
    }

    toString(): string {
        return this.docType + '_' + this.deviceType + '_' + this.timeSinceEpoch;
    }
}

export class IotEvent {
    _id: IotEventId;
    description: string;
    data: any;

    constructor(deviceType: string, description: string, data: any, time?: string) {
        var atTime = parseInt(time);
        if (atTime.toString().length !== time.length) {
            atTime = Date.parse(time);
        }
        this._id = new IotEventId('event', deviceType, atTime);
        this.description = description;
        this.data = data;
    }
}

export class Events extends ServerModule {
    private pouch: PouchDriver;

    constructor(dbUrl: string) {
        super();
        this.pouch = new PouchDriver(dbUrl);

        this.setupRoutes();
    }

    private setupRoutes() {
        this.router.get('/', (req, res) => {
            res.status(200).send('GET /events/');
        });

        this.router.get('/:id', (req, res) => {
            res.status(200).send('GET /events/' + req.params.id);
        });

        this.router.post('/', (req, res) => {
            res.status(200).send('POST /events/');
        });

        this.router.put('/:id', (req, res) => {
            res.status(200).send('PUT /events/' + req.params.id);
        });

        this.router.delete('/:id', (req, res) => {
            res.status(200).send('DELETE /events/' + req.params.id);
        });
    };
}
