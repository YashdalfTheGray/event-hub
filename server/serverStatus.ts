"use strict";
/// <reference path="../typings/main.d.ts" />

import { Router } from "express";
import { PouchDriver } from "./pouchDriver";
import { ServerModule } from "./serverModule";

export class ServerStatus extends ServerModule {
    private pouch: PouchDriver;

    constructor(dbUrl: string) {
        super();
        this.pouch = new PouchDriver(dbUrl);

        this.setupRoutes();
    }

    private setupRoutes() {
        this.router.get('/db', (req, res) => {
            this.pouch.info().then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json(error);
            })
        });
    }
}
