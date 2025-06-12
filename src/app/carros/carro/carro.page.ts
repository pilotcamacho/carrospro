import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel, IonItem,
  IonButton, IonInput
 } from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { CarrosService } from 'src/app/services/carros.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.page.html',
  styleUrls: ['./carro.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule, IonButton, IonInput
  ]
})
export class CarroPage implements OnInit {

  carroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carrosService: CarrosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carroForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900)]],
      plate: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.carroForm.invalid) return;

    const carroData = {
      ...this.carroForm.value
    };

    const newCarro = await this.carrosService.createCarro(carroData);
    console.log('Carro creado:', newCarro);
    this.router.navigate(['/carros']); // or wherever the list of carros is
  }

}
