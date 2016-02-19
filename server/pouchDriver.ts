/// <reference path="../typings/main.d.ts" />

import * as Interfaces from "./interfaces/databaseAbstraction";

// again, because typescript is being so butthurt about pouchdb
var PouchDb = require('pouchdb');

export class PouchDocument implements Interfaces.Document {
    _id: string;
}

export class PouchDriver implements Interfaces.DatabaseAbstraction {
    getAll(): Promise<any> {
        return new Promise<any>((resolve, reject) => {

        });
    }

    getOne(docType: string, docId: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {

        });
    }

    create(docType: string, docId: string, doc: PouchDocument): Promise<any> {
        return new Promise<any>((resolve, reject) => {

        });
    }

    modify(docType: string, docId: string, docToModify: PouchDocument): Promise<any> {
        return new Promise<any>((resolve, reject) => {

        });
    }

    delete(docType: string, docToDelete: PouchDocument): Promise<any> {
        return new Promise<any>((resolve, reject) => {

        });
    }
}
