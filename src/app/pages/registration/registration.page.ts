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
    IonAvatar
} from '@ionic/angular/standalone';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import { CustomerProfileRequest } from 'src/app/models/CustomerProfileRequest';
import { Address } from 'src/app/models/Address';
import { GeoLocation } from 'src/app/models/GeoLocation';

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
        IonText,
        IonAvatar
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {

    customer: CustomerProfileRequest = new CustomerProfileRequest();

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
        private modalController: ModalController
    ) { }

    takePicture() {
        this.cameraService.takePicture().then((profilePicture) => {
            this.customer.profilePicture = profilePicture;
            this.imageSelected = true;
            this.cdr.detectChanges();
        });
    }

    submitElderAddress() {
        this.elderAddressString = `${this.customer.elderAddress.Street}, ${this.customer.elderAddress.StreetNumber}, ${this.customer.elderAddress.City}, ${this.customer.elderAddress.ZipCode}`;
        this.customer.elderAddress.setFullAddress(this.elderAddressString);

        // Dismiss the modal and pass addressString
        this.modalController.dismiss();

        this.elderAddressString = this.customer.elderAddress.getFullAddress();
    }

    ngOnInit() { }
}
