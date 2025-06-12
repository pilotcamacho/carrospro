import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton,
  IonList, IonItem, IonButton, IonCardSubtitle,
  IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonLabel,
  IonNote, IonItemSliding, IonItemOptions, IonItemOption
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
    IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonLabel, IonNote,
    IonItemSliding, IonItemOptions, IonItemOption
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
    this.router.navigate(['/carro-new']);
  }


  async deleteCarro(carro: any) {
    console.log("CarrosPage::deleteCarro():: " + carro.id)
    const confirmed = confirm(`¿Eliminar el carro "${carro.name}"?`);
    if (confirmed) {
      await this.carrosSrv.deleteCarro(carro.id);
      this.loadCarros(); // Refresh list
    }
  }

  goToCarro(carro: any) {
    console.log("CarrosPage::addCarro():: " + carro.id)
    this.router.navigate(['/carro', carro.id]);
  }

}
