import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel,
  IonItem, IonButton, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea, IonToggle
} from '@ionic/angular/standalone';
import { ToDosService } from 'src/app/services/to-do.service';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonLabel, IonItem, IonButton, IonTextarea, 
    // IonDatetime, IonToggle
  ]
})
export class ToDoPage implements OnInit {

  servicioForm!: FormGroup;
  carroId!: string;

  // dateDone: string = ''; // local time string shown in the picker

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toDosService: ToDosService
  ) { }

  ngOnInit() {

    // this.updateLocalDatetime();

    this.carroId = this.route.snapshot.paramMap.get('carroId')!;
    this.servicioForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      // isDone: [false, Validators.required],
      // doneDate: [this.dateDone, Validators.required],
    });
  }

  // updateLocalDatetime() {
  //   // Convert UTC datetime from DB to local for display
  //   const utcDate = new Date();
  //   this.dateDone = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  // }

  async onSubmit() {
    if (this.servicioForm.invalid) return;

    const formValue = this.servicioForm.value;

    const toDoData = {
      name: formValue.name,
      description: formValue.description,
      // isDone: formValue.isDone,
      // doneDate: new Date(formValue.doneDate).toISOString().slice(0, 10),
      carroId: this.carroId
    };
    console.log('ToDoPage::onSubmit()::toDoData: ', toDoData);

    const newServicio = await this.toDosService.createToDo(toDoData);
    console.log('Servicio creado:', newServicio);
    this.router.navigate(['/carros']); // or back to carro detail
  }

}
