import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalController } from '@ionic/angular/standalone';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonModal, IonDatetime, IonToggle, IonButton } from '@ionic/angular/standalone';

import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';

import { Customer } from '../../models/customer.model';

import { ChangeDetectionStrategy } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { from } from 'rxjs';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
    standalone: true,
    imports: [
         CommonModule, 
        FormsModule, ReactiveFormsModule, MaskitoModule,
        IonHeader, IonToolbar, IonTitle, IonContent,
        IonList, IonItem, IonInput, IonModal, IonDatetime, IonToggle, IonButton],
    
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {

    [x: string]: any;
    //customer!: Customer;
    customer: Customer = {
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        phoneNumber: '',
        elderDescription: '',
        elderFirstName: '',
        elderLastName: '',
        elderBirthDate: '',
        elderAddress: '',
        elderTelephoneNumber: '',
    };


    public isNotElder: boolean = false;

    showPicker = false;

    setCustomerBirthdate(event: CustomEvent) {
        this.customer.birthDate = format(parseISO(event.detail.value), 'dd/MM/yyyy');
        this.showPicker = false;
    };

    setElderBirthdate(event: CustomEvent) {
        this.customer.elderBirthDate = format(parseISO(event.detail.value), 'dd/MM/yyyy');
        this.showPicker = false;
    };

    readonly phoneMask: MaskitoOptions = {
        mask: [ '+', '3', '9', ' ', /\b[1-9]\b/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/ ]
    };

    readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


    
    constructor() {
       
    }

    ngOnInit() { }
}

