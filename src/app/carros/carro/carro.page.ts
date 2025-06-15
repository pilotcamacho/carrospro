import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel, IonItem,
  IonButton, IonInput, IonItemOptions,
  IonList, IonItemSliding, IonItemOption, IonImg, IonThumbnail,
  IonText
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { CarrosService } from 'src/app/services/carros.service';
import { ActivatedRoute } from '@angular/router';
import { ToDosService } from 'src/app/services/to-do.service';
import { DocumentsService } from 'src/app/services/documents.service';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-carro',
  templateUrl: './carro.page.html',
  styleUrls: ['./carro.page.scss'],
  standalone: true,
  imports: [IonImg, IonThumbnail, IonItemOptions, IonItem, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule, IonButton,
    IonList, IonItemSliding, IonItemOption,
    IonText
  ]
})
export class CarroPage implements OnInit {

  carro: any = {};
  toDos: any[] = [];
  documents: any[] = [];


  constructor(
    private fb: FormBuilder,
    private carrosService: CarrosService,
    private toDosService: ToDosService,
    private documentsService: DocumentsService,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // const carroId = this.route.snapshot.paramMap.get('carroId');

    // if (carroId && carroId !== 'new') {
    //   this.loadCarro(carroId);
    // }
  }

  ionViewWillEnter() {
    const carroId = this.route.snapshot.paramMap.get('carroId');
    console.log('CarroNewPage::ionViewWillEnter()::carroId: ', carroId);

    if (carroId && carroId !== 'new') {
      this.loadCarro(carroId);
    }
  }

  async loadCarro(carroId: string) {
    try {
      this.carro = await this.carrosService.getCarroById(carroId);
      this.toDos = await this.toDosService.listToDosByCarroId(carroId);
      this.documents = await this.documentsService.listDocumentsByCarroId(carroId);

    } catch (error) {
      console.error('Error loading carro:', error);
      // Optional: redirect or show message
    }
  }

  goToEdit() {
    this.router.navigate(['/carro-edit'], { queryParams: { carroId: this.carro.id } });
  }

  goToDocument(carro: any, event: Event) {
    event.stopPropagation(); // Prevent parent item click
    this.router.navigate(['/document', carro.id]); // or whatever your route is
  }

  async deleteDocument(id: string) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este documento?');
    if (!confirmed) return;

    await this.documentsService.deleteDocument(id);
    this.documents = this.documents.filter(doc => doc.id !== id);
  }


  goToToDo(carro: any, event: Event) {
    event.stopPropagation(); // Prevent parent item click
    this.router.navigate(['/to-do', carro.id]); // or whatever your route is
  }


  async deleteToDo(id: string) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este documento?');
    if (!confirmed) return;

    await this.toDosService.deleteToDo(id);
    this.toDos = this.toDos.filter(doc => doc.id !== id);
  }

  async done(toDo: any) {
    const alert = await this.alertController.create({
      header: '¿Marcar como hecho?',
      message: `¿Estás seguro de que terminaste la actividad: "${toDo.name}"?`, // HTML allowed
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, hecho',
          handler: () => {
            this.markAsDone(toDo);
          },
        },
      ],
      cssClass: 'custom-alert' // optional, for styling
    });

    await alert.present();
  }


  markAsDone(toDo: any) {
    // Lógica para marcar como hecho, por ejemplo:
    toDo.isDone = true;
    toDo.doneDate = new Date().toISOString().slice(0, 10);
    // ... llamar servicio para guardar si aplica
    this.toDosService.updateToDo(toDo);
    console.log('Actividad marcada como hecha:', toDo);
  }
}
