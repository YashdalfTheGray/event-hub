/// <reference path="../../typings/main.d.ts" />

export interface Document {
    _id: string;
}

export interface DatabaseAbstraction {
    getAll(): Promise<any>;
    getOne(docType: string, docId: string): Promise<any>;
    create(docType: string, docId: string, doc: Document): Promise<any>;
    modify(docType: string, docId: string, docToModify: Document): Promise<any>;
    delete(docType: string, docToDelete: Document): Promise<any>;
}
