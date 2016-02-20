/// <reference path="../typings/main.d.ts" />

import { Router } from "express";
import { PouchDriver, PouchDocument } from "./pouchDriver";

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

export class Events {
    private _router: Router;
    private pouch: PouchDriver;

    constructor(dbUrl: string) {
        this.pouch = new PouchDriver(dbUrl);
        this._router = Router();

        this.setupRoutes();
    }

    get router(): Router {
        return this._router;
    }

    private setupRoutes() {
        this._router.get('/', (req, res) => {
            res.status(200).send('GET /events/');
        });

        this._router.get('/:id', (req, res) => {
            res.status(200).send('GET /events/:id');
        });

        this._router.post('/', (req, res) => {
            res.status(200).send('POST /events/');
        });

        this._router.put('/:id', (req, res) => {
            res.status(200).send('PUT /events/:id');
        });

        this._router.delete('/:id', (req, res) => {
            res.status(200).send('DELETE /events/:id');
        });
    };
}
