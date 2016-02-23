"use strict";
/// <reference path="../typings/main.d.ts" />

import { Router } from "express";
import { DatabaseAbstraction } from "./interfaces/databaseAbstraction";

export class ServerModule {
    private _router: Router;
    private db: DatabaseAbstraction;

    constructor() {
        this._router = Router();
    }

    get router(): Router {
        return this._router;
    }
}
