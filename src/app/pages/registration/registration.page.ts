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
  IonText,
  IonAvatar,
  AlertController,
} from '@ionic/angular/standalone';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import { CustomerProfileRequest } from 'src/app/models/CustomerProfileRequest';
import { Address } from 'src/app/models/Address';
import { GeoLocation } from 'src/app/models/GeoLocation';

import { ChangeDetectionStrategy } from '@angular/core';

import { format, parseISO } from 'date-fns';

import { CameraService } from 'src/app/services/camera.service';

import { GeocodingService } from 'granp-lib';

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
    IonText,
    IonAvatar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {
  customer: CustomerProfileRequest = new CustomerProfileRequest();

  geocodingService = inject(GeocodingService);

  showPicker = false;
  imageSelected = false;
  elderAddressString: string = '';

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
      /\d/,
      /\d/,
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(
    private cameraService: CameraService,
    private cdr: ChangeDetectorRef,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  takePicture() {
    this.cameraService.takePicture().then((profilePicture) => {
      this.customer.profilePicture = profilePicture;
      this.imageSelected = true;
      this.cdr.detectChanges();
    });
  }

  submitElderAddress() {
    this.elderAddressString = `${this.customer.elderAddress.Street}, ${this.customer.elderAddress.StreetNumber}, ${this.customer.elderAddress.City}, ${this.customer.elderAddress.ZipCode}`;
    this.convertAddressToCoordinates(this.elderAddressString);

    this.elderAddressString = `${this.customer.elderAddress.Street}, ${this.customer.elderAddress.StreetNumber}, ${this.customer.elderAddress.City}, ${this.customer.elderAddress.ZipCode}`;
    this.customer.elderAddress.setFullAddress(this.elderAddressString);
    //reverseGeocodeSubscription.unsubscribe();

    // Dismiss the modal and pass addressString
    this.modalController.dismiss();
  }

  convertAddressToCoordinates(address: string) {
    this.geocodingService.getAddressLocation(address).subscribe((data: any) => {
      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates;
        this.customer.elderAddress.Location!.Latitude = coordinates[1];
        this.customer.elderAddress.Location!.Longitude = coordinates[0];

        this.geocodingService
          .getReverseGeocodeLocation(
            this.customer.elderAddress.Location!.Latitude,
            this.customer.elderAddress.Location!.Longitude
          )
          .subscribe((reverseData: any) => {
            if (reverseData.features && reverseData.features.length > 0) {
              console.log(reverseData);
              const addressArray = reverseData.features[0];
              this.customer.elderAddress.ZipCode = addressArray.context[0].text;
              this.customer.elderAddress.City = addressArray.context[1].text;
              this.customer.elderAddress.StreetNumber = addressArray.address;
              this.customer.elderAddress.Street = addressArray.properties.text;
              console.log(this.customer.elderAddress);

            }
          });
      } else {
        this.alertController.create({
          header: 'Errore',
          message: 'Indirizzo non valido',
          buttons: ['OK'],
        });
      }
    });
  }

  ngOnInit() {}
}
