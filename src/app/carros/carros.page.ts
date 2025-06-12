import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonList, IonItem, IonButton, IonCardSubtitle,
  IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonLabel,
  IonNote
} from '@ionic/angular/standalone';
import { CarrosService } from '../services/carros.service';
import { } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.page.html',
  styleUrls: ['./carros.page.scss'],
  standalone: true,
  imports: [IonLabel, IonCardSubtitle, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton,
    IonList, IonItem, IonButton,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonLabel, IonNote
  ]
})
export class CarrosPage implements OnInit {

  carros: any[] = [];

  constructor(
    private router: Router,
    private carrosSrv: CarrosService
  ) {
    this.loadCarros();
  }

  ionViewWillEnter() {
    this.loadCarros();
  }

  ngOnInit() {
  }

  loadCarros() {
    console.log("CarrosPage::loadCarros()")
    this.carrosSrv.listCarros().then(carros => {
      this.carros = carros;
    });
  }

  addCarro() {
    console.log("CarrosPage::addCarro()")
    this.router.navigate(['/carro']);
  }

}
