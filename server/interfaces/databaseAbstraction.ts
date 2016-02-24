/// <reference path="../../typings/main.d.ts" />

export interface Document {
    _id: string;
}

export interface DatabaseAbstraction {
    getAll(): Promise<Array<Document>>;
    getOne(docId: string): Promise<Document>;
    create(doc: Document): Promise<any>;
    modify(docToModify: Document): Promise<any>;
    delete(docToDelete: Document): Promise<any>;
}
