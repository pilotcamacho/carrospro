import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel,
  IonItem, IonButton, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea
} from '@ionic/angular/standalone';
import { ServicesService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonLabel, IonItem, IonButton, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea
  ]
})
export class ServicioPage implements OnInit {

  servicioForm!: FormGroup;
  carroId!: string;

  localDatetime: string = ''; // local time string shown in the picker

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviciosService: ServicesService
  ) { }

  ngOnInit() {

    this.updateLocalDatetime();

    this.carroId = this.route.snapshot.paramMap.get('carroId')!;
    this.servicioForm = this.fb.group({
      name: ['', Validators.required],
      type: ['Gasolina', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      km: [null, [Validators.required, Validators.min(0)]],
      dateTime: [this.localDatetime, Validators.required]
    });
  }

  updateLocalDatetime() {
    // Convert UTC datetime from DB to local for display
    const utcDate = new Date();
    this.localDatetime = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  async onSubmit() {
    if (this.servicioForm.invalid) return;

    const formValue = this.servicioForm.value;

    const servicioData = {
      name: formValue.name,
      type: formValue.type,
      description: formValue.description,
      price: formValue.price,
      km: formValue.km,
      dateTime: new Date(formValue.dateTime).toISOString(),
      carroId: this.carroId
    };

    const newServicio = await this.serviciosService.createService(servicioData);
    console.log('Servicio creado:', newServicio);
    this.router.navigate(['/carros']); // or back to carro detail
  }

}
