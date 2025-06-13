import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg, IonButtons, IonBackButton, IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';

import { DocumentsService } from '../services/documents.service'; // adjust the path if needed

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonImg,
    CommonModule,
    FormsModule, IonButtons, IonBackButton, IonItemSliding, IonItemOptions, IonItemOption
  ]
})
export class DocumentsPage implements OnInit {
  documents: any[] = [];

  constructor(private documentsService: DocumentsService) {}

  async ngOnInit() {
    this.documents = await this.documentsService.listDocuments();
  }

  async deleteDocument(id: string) {
  const confirmed = confirm('¿Estás seguro de que deseas eliminar este documento?');
  if (!confirmed) return;

  await this.documentsService.deleteDocument(id);
  this.documents = this.documents.filter(doc => doc.id !== id);
}
}
