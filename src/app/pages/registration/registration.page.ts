import { Component, inject } from '@angular/core';
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
    AlertController,
} from '@ionic/angular/standalone';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import { AddressSelectorComponent, ImageSelectorComponent, BirthdateSelectorComponent, CustomerProfileRequest } from 'granp-lib';
import { ChangeDetectionStrategy } from '@angular/core';

import { GeocodingService } from 'granp-lib';
import { ProfileService } from 'granp-lib';
import { Router } from '@angular/router';

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
        ImageSelectorComponent,
        AddressSelectorComponent,
        BirthdateSelectorComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage {
    customer: CustomerProfileRequest = new CustomerProfileRequest();

    geocodingService = inject(GeocodingService);
    profileService = inject(ProfileService);
    alertController = inject(AlertController);
    modalController = inject(ModalController);
    cdr = inject(ChangeDetectorRef);
    router = inject(Router);

    readonly phoneMask: MaskitoOptions = {
        mask: ['+', '3', '9', ' ', /\b[1-9]\b/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    };

    readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
        (el as HTMLIonInputElement).getInputElement();


    completeCustomerProfile() {
        this.profileService.completeProfile(this.customer).then(() => {
            this.router.navigate(['/tabs']);
        });
    }

} 
