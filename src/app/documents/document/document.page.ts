import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonLabel,
  IonItem, IonButton, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea
} from '@ionic/angular/standalone';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonLabel, IonItem, IonButton, IonInput, IonDatetime, IonTextarea
  ]
})
export class DocumentPage implements OnInit {

  servicioForm!: FormGroup;
  carroId!: string;

  maxDate = '2100-12-31'; // or dynamically set to a far future date if needed
  localDatetimeIssueDate: string = ''; // local time string shown in the picker
  localDatetimeExpirationDate: string = ''; // local time string shown in the picker

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private documentsService: DocumentsService
  ) { }

  ngOnInit() {

    this.updateLocalDatetime();

    this.carroId = this.route.snapshot.paramMap.get('carroId')!;
    this.servicioForm = this.fb.group({
      name: [null, Validators.required],
      issueDate: [this.localDatetimeIssueDate, Validators.required],
      expirationDate: [this.localDatetimeExpirationDate, Validators.required],
      cost: [null, [Validators.required, Validators.min(0)]],
    });
  }

  updateLocalDatetime() {
    // Convert UTC datetime from DB to local for display
    const utcDate = new Date();
    this.localDatetimeIssueDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    this.localDatetimeExpirationDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  async onSubmit() {
    if (this.servicioForm.invalid) return;

    const formValue = this.servicioForm.value;

    const documentData = {
      name: formValue.name,
      issueDate: new Date(formValue.issueDate).toISOString().slice(0, 10),
      expirationDate: new Date(formValue.expirationDate).toISOString().slice(0, 10),
      cost: formValue.cost,
      carroId: this.carroId
    };
    console.log('DocumentPage::onSubmit()::documentData: ', documentData);

    const newServicio = await this.documentsService.createDocument(documentData);
    console.log('Servicio creado:', newServicio);
    this.router.navigate(['/carros']); // or back to carro detail
  }

}
