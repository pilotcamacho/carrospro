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
  IonButtons, IonBackButton, IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { ToDosService } from '../services/to-do.service';


@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.page.html',
  styleUrls: ['./to-dos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    CommonModule,
    FormsModule, IonButtons, IonBackButton, IonItemSliding, IonItemOptions, IonItemOption
  ]
})
export class ToDosPage implements OnInit {
  toDos: any[] = [];

  constructor(private toDosService: ToDosService) { }

  async ngOnInit() {
    this.toDos = await this.toDosService.listToDos();
  }

  async deleteToDo(id: string) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este documento?');
    if (!confirmed) return;

    await this.toDosService.deleteToDo(id);
    this.toDos = this.toDos.filter(doc => doc.id !== id);
  }
}
