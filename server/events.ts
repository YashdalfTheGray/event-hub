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
            this.pouch.getAll({
                include_docs: req.query.include_docs || false
            }).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json(error);
            })
        });

        this.router.get('/:id', (req, res) => {
            this.pouch.getOne(req.params.id).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json(error);
            });
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
            var docToUpdate = req.body;
            docToUpdate._id = req.params.id;
            this.pouch.modify(docToUpdate).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json(error);
            });
        });

        this.router.delete('/', (req, res) => {
            var docToDelete = req.body;
            this.pouch.delete(docToDelete).then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json(error);
            });
        });
    };
}
