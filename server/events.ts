/// <reference path="../typings/main.d.ts" />

import { Router } from "express";
import { PouchDriver, PouchDocument } from "./pouchDriver";

export class Events {
    router: Router;
    pouch: PouchDriver;

    constructor() {
        this.pouch = new PouchDriver('http://localhost:8080/events');
    }

}
