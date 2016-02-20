/// <reference path="../typings/main.d.ts" />

import * as Interfaces from "./interfaces/databaseAbstraction";

// again, because typescript is being so butthurt about pouchdb
var PouchDb = require('pouchdb');

export class PouchDocument implements Interfaces.Document {
    _id: string;
    rev: string;
}

export class PouchDriver implements Interfaces.DatabaseAbstraction {

    db: any;

    constructor(dbUrl: string) {
        this.db = new PouchDb(dbUrl);
    }

    getAll(): Promise<any> {
        return this.db.allDocs({ include_docs: true });
    }

    getOne(docType: string, docId: string): Promise<any> {
        return this.db.get(docId);
    }

    create(docType: string, docId: string, doc: PouchDocument): Promise<any> {
        doc._id = docId;
        return this.db.put(doc);
    }

    modify(docType: string, docId: string, docToModify: PouchDocument): Promise<any> {
        docToModify._id = docId;
        return this.db.put(docToModify);
    }

    delete(docType: string, docToDelete: PouchDocument): Promise<any> {
        return this.db.remove(docToDelete._id, docToDelete.rev);
    }
}
