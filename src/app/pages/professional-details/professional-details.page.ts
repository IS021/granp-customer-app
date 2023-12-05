import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Professional } from 'src/app/models/professionalPublicResponse.model';
import {
  IonItem,
  IonLabel,
  IonList,
  IonAvatar,
  IonContent,
  IonText,
  IonRow, 
  IonCol,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonGrid,
  IonButton,
  IonToast
  } 
from '@ionic/angular/standalone'

import { addIcons } from 'ionicons';
import { call, home, personCircleOutline, mailOpenOutline, calendarOutline, medicalOutline, locationOutline, walletOutline, checkmarkOutline, closeOutline, checkmarkDoneCircle, alertCircle, maleOutline, femaleOutline, helpOutline } from 'ionicons/icons';
import { ToastController } from '@ionic/angular';
import { Gender } from 'src/app/models/Gender';
import { Profession } from 'src/app/models/Profession';

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
    IonAvatar, 
    IonContent, 
    IonText, 
    IonRow, 
    IonCol, 
    IonIcon,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonGrid,
    IonButton,
    IonToast
  ]
})
export class ProfessionalDetailsPage implements OnInit {

  professionalSelected: Professional={
    profilePicture: 'https://media.licdn.com/dms/image/D4D03AQGYkhM5dJaOzA/profile-displayphoto-shrink_200_200/0/1701771914667?e=2147483647&v=beta&t=fOKz1A9gbM5KRAgdgXhv8ElwW16R8hJ8buXEXEdIGn0',
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
    isVerified: true,
    hourlyRate: 200,
    longTimeJob: false,
    shortTimeJob: true,

  };

  constructor(private toastController: ToastController) {
    addIcons({ call, home, personCircleOutline, mailOpenOutline, calendarOutline, medicalOutline, locationOutline, walletOutline, checkmarkOutline, closeOutline, checkmarkDoneCircle, alertCircle,  maleOutline, femaleOutline, helpOutline });
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
