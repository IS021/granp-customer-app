import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonItem,
    IonLabel,
    IonList,
    IonContent,
    IonText,
    IonRow,
    IonCol,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonGrid,
    IonButton,
    IonIcon
}
    from '@ionic/angular/standalone'

import { addIcons } from 'ionicons';
import { call, home, personCircleOutline, mailOpenOutline, calendarOutline, medicalOutline, locationOutline, walletOutline, checkmarkOutline, closeOutline, checkmarkDoneCircle, alertCircle, maleOutline, femaleOutline, helpOutline } from 'ionicons/icons';

import { Gender, Profession, ProfessionalPublicResponse } from 'granp-lib';

import { AvatarComponent } from 'granp-lib';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-professional-details',
    templateUrl: './professional-details.page.html',
    styleUrls: ['./professional-details.page.scss'],
    standalone: true,
    imports: [CommonModule,
        FormsModule,
        IonItem,
        IonLabel,
        IonList,
        IonContent,
        IonText,
        IonRow,
        IonCol,
        IonHeader,
        IonToolbar,
        IonBackButton,
        IonButtons,
        IonTitle,
        IonGrid,
        IonButton,
        IonIcon,
        AvatarComponent
    ]
})
export class ProfessionalDetailsPage {

    activatedRoute = inject(ActivatedRoute);

    professional?: ProfessionalPublicResponse;

    showButtons: boolean = false;

    constructor() {
        addIcons({ call, home, personCircleOutline, mailOpenOutline, calendarOutline, medicalOutline, locationOutline, walletOutline, checkmarkOutline, closeOutline, checkmarkDoneCircle, alertCircle, maleOutline, femaleOutline, helpOutline });

        this.activatedRoute.queryParams.subscribe(params => {
            this.professional = JSON.parse(params["professional"]) as ProfessionalPublicResponse;
            this.showButtons = params["showButtons"] == "true";
        });
    }

    getProfession(profession?: Profession) {
        switch (profession) {
            case Profession.Doctor:
                return "Dottore";
            case Profession.Nurse:
                return "Infermiere";
            case Profession.Physiotherapist:
                return "Fisioterapista";
            case Profession.Caregiver:
                return "Badante";
            case Profession.Other:
                return "Altro";
            default:
                return "Nessuna professione";
        }
    }

    checkGender(): string {
        switch (this.professional?.gender) {
            case Gender.Male:
                return 'Uomo';
            case Gender.Female:
                return 'Donna';
            default:
                return 'Non definito';
        }
    }

    checkGenderIcon(): string {
        switch (this.professional?.gender) {
            case Gender.Male:
                return 'male-outline';
            case Gender.Female:
                return 'female-outline';
            default:
                return 'help-outline';
        }
    }

}
