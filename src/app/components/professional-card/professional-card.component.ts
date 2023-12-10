import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonRow,
    IonGrid,
    IonCol
}
    from '@ionic/angular/standalone'

import { Gender, Profession, ProfessionalPublicResponse } from 'granp-lib';

import { AvatarComponent } from 'granp-lib';

@Component({
    selector: 'app-professional-card',
    templateUrl: './professional-card.component.html',
    styleUrls: ['./professional-card.component.scss'],
    standalone: true,
    imports: [IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonItem,
        NgIf,
        IonRow,
        IonGrid,
        IonCol,
        AvatarComponent
    ]
})
export class ProfessionalCardComponent {

    @Input() professional?: ProfessionalPublicResponse;

    getProfession(profession?: Profession) {
        switch(profession) {
            case Profession.Doctor:
                return "Dottore";
            case Profession.Nurse:
                return "Infermiere";
            case Profession.Physiotherapist:
                return "Fisioterapista";
            case Profession.Caregiver:
                return "Assistente";
            case Profession.Other:
                return "Altro";
            default:
                return "Nessuna professione";
        }
    }
}
