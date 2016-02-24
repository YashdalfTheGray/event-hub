"use strict";
/// <reference path="../typings/main.d.ts" />

import * as Interfaces from "./interfaces/databaseAbstraction";

// Because typscript is being a stupid whiny bitch
// again, because typescript is being so butthurt about pouchdb
var PouchDb = require('pouchdb');

export class PouchDocument implements Interfaces.Document {
    _id: string;
    _rev: string;
}

export class PouchDriver implements Interfaces.DatabaseAbstraction {

    db: any;

    constructor(dbUrl: string) {
        this.db = new PouchDb(dbUrl);
    }

    info(): Promise<any> {
        return this.db.info();
    }

    getAll(): Promise<Array<PouchDocument>> {
        return this.db.allDocs({ include_docs: true });
    }

    getOne(docId: string): Promise<PouchDocument> {
        return this.db.get(docId);
    }

    create(doc: PouchDocument): Promise<any> {
        return this.db.put(doc);
    }

    modify(docToModify: PouchDocument): Promise<any> {
        return this.db.put(docToModify);
    }

    delete(docToDelete: PouchDocument): Promise<any> {
        return this.db.remove(docToDelete._id, docToDelete._rev);
    }
}
