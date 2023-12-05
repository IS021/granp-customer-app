import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { checkmarkDoneCircle, alertCircle } from 'ionicons/icons';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAvatar,
  IonItem,
  IonRow,
  IonGrid,
  IonCol,
  IonIcon
  } 
from '@ionic/angular/standalone'
import { Gender } from 'src/app/models/Gender';
import { Profession } from 'src/app/models/Profession';
import { Professional } from 'src/app/models/professionalPublicResponse.model';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular';

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
    IonAvatar,
    IonItem,
    NgIf,
    IonRow,
    IonGrid,
    IonCol,
    IonIcon
  ]
})
export class ProfessionalCardComponent  implements OnInit {

  professionalSelected: Professional={
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
  
  constructor(private toastController: ToastController) { 
    addIcons({ checkmarkDoneCircle, alertCircle })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async presentToastFalse(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  ngOnInit() {}

}
