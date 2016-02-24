"use strict";
/// <reference path="../typings/main.d.ts" />

import { Router } from "express";
import { PouchDriver, PouchDocument } from "./pouchDriver";
import { ServerModule } from "./serverModule";
import * as _ from "lodash";

export class IotEvent extends PouchDocument {
    description: string;
    data: string;

    constructor(_id: string, description: string, data: string) {
        super();
        this._id = _id;
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
            this.pouch.getAll().then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json(error);
            })
        });

        this.router.get('/:id', (req, res) => {
            res.status(200).send('GET /events/' + req.params.id);
        });

        this.router.post('/', (req, res) => {
            var doc = new IotEvent(
                'event_' + req.body.eventSource + '_' + req.body.time,
                req.body.description,
                req.body.data
            );
            this.pouch.create(doc).then(result => {
                res.status(201).json(result);
            }).catch(error => {
                res.status(500).json(error);
            });
        });

        this.router.put('/:id', (req, res) => {
            res.status(200).send('PUT /events/' + req.params.id);
        });

        this.router.delete('/:id', (req, res) => {
            res.status(200).send('DELETE /events/' + req.params.id);
        });
    };
}
