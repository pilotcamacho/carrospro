import { Injectable } from '@angular/core';

import { generateClient, SelectionSet } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import { UsuarioService } from './usuario.service';


type Document = Schema['Document']['type'];

const client = generateClient<Schema>();

const documentSelectionSet = ['id', 'name', 'issueDate', 'expirationDate', 'cost', 'carroId'] as const;
type DocumentSelectionSet = SelectionSet<Schema['Document']['type'], typeof documentSelectionSet>;

type DocumentType = 'jpg' | 'pdf';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {


  constructor(
    private usuarioSrv: UsuarioService
  ) { }

  async getDocumentById(documentId: string): Promise<DocumentSelectionSet | null> {
    const { data: document, errors } = await client.models.Document.get({ id: documentId }, { selectionSet: documentSelectionSet });
    console.log('DocumentsDocument::getDocumentById', document, errors);
    return document;
  }

  async listDocuments(): Promise<DocumentSelectionSet[]> {
    const { data: documents, errors } = await client.models.Document.list({ selectionSet: documentSelectionSet });
    console.log('DocumentsDocument::listDocuments', documents, errors);
    return documents;
  }

  async listDocumentsByCarroId(carroId: string): Promise<DocumentSelectionSet[]> {
    const { data: documents, errors } = await client.models.Document.listDocumentByCarroIdAndExpirationDate(
      { carroId: carroId },
      { selectionSet: documentSelectionSet });
    console.log('DocumentsDocument::listDocuments', documents, errors);
    return documents;
  }


  async createDocument(documentData:
    {
      carroId: string,
      name: string
      issueDate: string,
      expirationDate: string,
      cost: number
    }
  ): Promise<any> {
    const { data: createdDocument, errors } = await client.models.Document.create(
      documentData);
    console.log('DocumentsDocument::createDocument', createdDocument, errors);
    return createdDocument
  }


  async updateDocument(documentData:
    {
      id: string,
      issueDate: string,
      expirationDate: string,
      cost: number,
    }
  ): Promise<any> {
    // const usuario = this.usuarioSrv.usuarioId
    // const createdAt = new Date().toISOString()
    // const currentLocation = await this.locationSrv.getCurrentLocation()
    const { data: createdDocument, errors } = await client.models.Document.update(
      documentData);
    console.log('DocumentsDocument::createDocument', createdDocument, errors);
    return createdDocument
  }

  async deleteDocument(documentId: string): Promise<void> {
    console.log('DocumentsDocument::deleteDocument');

    const { data: deletedDocument, errors } = await client.models.Document.delete({ id: documentId });

    console.log('DocumentsDocument::deleteDocument', deletedDocument);
  }
}
