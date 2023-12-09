import { Component, OnInit } from '@angular/core';
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
export class ProfessionalDetailsPage implements OnInit {

  professionalSelected: ProfessionalPublicResponse = {
    profilePicture: '',
    firstName: 'Alessandro',
    lastName: 'Perna',
    birthDate: '03/02/2000',
    age: 23,
    gender: Gender.Male,
    email: 'pernalex@hotmail.it',
    phoneNumber: '3342666590',

    description: "Studente ingegneria fuoricorso, podcaster e appassionato di sushi, psicologia e d'i femmn",

    profession: Profession.Other,
    address: 'Via delle Vie, 69, Sannicandro, 70028',
    isVerified: false,
    hourlyRate: 200,
    longTimeJob: false,
    shortTimeJob: true,

  };

  constructor() {
    addIcons({ call, home, personCircleOutline, mailOpenOutline, calendarOutline, medicalOutline, locationOutline, walletOutline, checkmarkOutline, closeOutline, checkmarkDoneCircle, alertCircle,  maleOutline, femaleOutline, helpOutline });
  }

  checkGender(): string {
    switch (this.professionalSelected.gender) {
      case Gender.Male:
        return 'Uomo';
      case Gender.Female:
        return 'Donna';
      default:
        return 'Non definito';
    }
  }

  checkGenderIcon(): string {
    switch (this.professionalSelected.gender) {
      case Gender.Male:
        return 'male-outline';
      case Gender.Female:
        return 'female-outline';
      default:
        return 'help-outline';
    }
  }

  ngOnInit() {
  }

}
