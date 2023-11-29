import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonModal,
  IonDatetime,
  IonToggle,
  IonButton,
  IonFabButton,
} from '@ionic/angular/standalone';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import { Customer } from '../../models/customer.model';
import { Address } from '../../models/Address';
import { GeoLocation } from '../../models/Location';

import { ChangeDetectionStrategy } from '@angular/core';

import { format, parseISO } from 'date-fns';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { CameraService } from 'src/app/services/camera.service';

<<<<<<< HEAD

=======
>>>>>>> 63af9f3fa3c8a976d235b09a8c42b059743c50d0
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaskitoModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonModal,
    IonDatetime,
    IonToggle,
    IonButton,
    IonFabButton,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {
  //customer!: Customer
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    address: new Address('', '', '', '', new GeoLocation(0, 0)),
    phoneNumber: '',
    elderDescription: '',
    elderFirstName: '',
    elderLastName: '',
    elderBirthDate: '',
    elderAddress: '',
    elderTelephoneNumber: '',
    profilePicture: '',
    isNotElder: false,
  };

  showPicker = false;
  imageSelected = false;

  setCustomerBirthdate(event: CustomEvent) {
    this.customer.birthDate = format(
      parseISO(event.detail.value),
      'dd/MM/yyyy'
    );
    this.showPicker = false;
  }

  setElderBirthdate(event: CustomEvent) {
    this.customer.elderBirthDate = format(
      parseISO(event.detail.value),
      'dd/MM/yyyy'
    );
    this.showPicker = false;
  }

  readonly phoneMask: MaskitoOptions = {
    mask: [
      '+',
      '3',
      '9',
      ' ',
      /\b[1-9]\b/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(
    private cameraService: CameraService,
    private cdr: ChangeDetectorRef
  ) {}

  takePicture() {
    this.cameraService.takePicture().then((profilePicture) => {
      this.customer.profilePicture = profilePicture;
      this.imageSelected = true;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {}
}
