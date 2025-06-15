import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel, IonItem,
  IonButton, IonInput
} from '@ionic/angular/standalone';

import { ActivatedRoute, Router } from '@angular/router';
import { CarrosService } from 'src/app/services/carros.service';

@Component({
  selector: 'app-carro-new',
  templateUrl: './carro-edit.page.html',
  styleUrls: ['./carro-edit.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule, IonButton, IonInput
  ]
})
export class CarroEditPage implements OnInit {

  carro: any = {};

  carroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carrosService: CarrosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carroForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900)]],
      plate: ['', Validators.required],
      color: ['', Validators.required]
    });

    const carroId = this.route.snapshot.queryParamMap.get('carroId');
    console.log('CarroNewPage::ngOnInit()::carroId: ', carroId);

    if (carroId && carroId !== 'new') {
      this.loadCarro(carroId);
    }
  }

  async loadCarro(carroId: string) {
    try {
      this.carro = await this.carrosService.getCarroById(carroId);


      if (this.carro) {
        this.carroForm.patchValue(this.carro);
      }
    } catch (error) {
      console.error('Error loading carro:', error);
      // Optional: redirect or show message
    }
  }

  async onSubmit() {
    if (this.carroForm.invalid) return;

    const carroData = {
      ...this.carroForm.value
    };

    const updatedCarro = await this.carrosService.updateCarro(carroData);
    console.log('CarroEditpage::onSubmit()::updatedCarro:', updatedCarro);
    this.router.navigate(['/carro', this.carro.id]); // or wherever the list of carros is
  }

}
