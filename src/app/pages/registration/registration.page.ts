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
  IonTextarea,
  IonLabel,
  IonButtons,
  ModalController,
  IonCheckbox,
  IonText
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
import { th } from 'date-fns/locale';

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
    IonTextarea,
    IonModal,
    IonDatetime,
    IonToggle,
    IonButton,
    IonFabButton,
    IonLabel,
    IonButtons,
    IonCheckbox,
    IonText
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
    elderAddress: new Address('', '', '', '', new GeoLocation(0, 0)),
    elderTelephoneNumber: '',
    profilePicture: '',
    isElder: false,
  };

  showPicker = false;
  imageSelected = false;
  addressString : string = '';
  differentAddress: boolean = false;
  elderAddressString : string = '';

  

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
    private cdr: ChangeDetectorRef,
    private modalController: ModalController
  ) {}

  takePicture() {
    this.cameraService.takePicture().then((profilePicture) => {
      this.customer.profilePicture = profilePicture;
      this.imageSelected = true;
      this.cdr.detectChanges();
    });
  }

  submitCustomerAddress() {
  
   this.addressString = `${this.customer.address.Street}, ${this.customer.address.StreetNumber}, ${this.customer.address.City}, ${this.customer.address.ZipCode}`;
   this.customer.address.setFullAddress(this.addressString);
   
   // Dismiss the modal and pass addressString
  this.modalController.dismiss({
    'addressString': this.addressString
  });
  }

  submitElderAddress() {
  
    this.elderAddressString = `${this.customer.elderAddress.Street}, ${this.customer.elderAddress.StreetNumber}, ${this.customer.elderAddress.City}, ${this.customer.elderAddress.ZipCode}`;
    this.customer.elderAddress.setFullAddress(this.elderAddressString);
    
    // Dismiss the modal and pass addressString
   this.modalController.dismiss({
     'elderAddressString': this.elderAddressString
   });
  }

  checkboxChanged(event: any) {
    this.differentAddress = event.detail.checked;
  }


  ngOnInit() {}
}
