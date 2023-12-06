import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class ProfessionalCardComponent  implements OnInit {

  professionalSelected: ProfessionalPublicResponse = {
    profilePicture: 'https://m.media-amazon.com/images/M/MV5BOTBhMTI1NDQtYmU4Mi00MjYyLTk5MjEtZjllMDkxOWY3ZGRhXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_FMjpg_UX1000_.jpg',
    firstName: 'Alessandro',
    lastName: 'Perna',
    birthDate: '31/12/1978',
    age: 44,
    gender: Gender.Male,
    email: 'jhonny_tuttofare_sins@granpmail.com',
    phoneNumber: '6909006990',

    description: "Studente ingegneria fuoricorso, podcaster e appassionato di sushi, psicologia e d'i femmn",

    profession: Profession.Other,
    address: 'Via dei Brazzers, 69, Mellitto, 70124',
    isVerified: false,
    hourlyRate: 20,
    longTimeJob: false,
    shortTimeJob: true,

  };
  
  ngOnInit() {}

}
