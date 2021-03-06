/// <reference path="../../typings/main.d.ts" />

export interface Document {
    _id: string;
}

export interface DatabaseConfig {
}

export interface DatabaseAbstraction {
    getAll(config: DatabaseConfig): Promise<Array<Document>>;
    getOne(docId: string): Promise<Document>;
    create(doc: Document): Promise<any>;
    modify(docToModify: Document): Promise<any>;
    delete(docToDelete: Document): Promise<any>;
}
