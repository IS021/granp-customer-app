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
    profilePicture: 'https://res.cloudinary.com/teepublic/image/private/s--FIor6wdk--/c_fit,g_north_west,h_840,w_840/co_c62b29,e_outline:40/co_c62b29,e_outline:inner_fill:1/co_ffffff,e_outline:40/co_ffffff,e_outline:inner_fill:1/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1608275710/production/designs/17539365_0.jpg',
    firstName: 'Johnny',
    lastName: 'Sins',
    birthDate: '31/12/1978',
    age: 44,
    gender: Gender.Male,
    email: 'jhonny_tuttofare_sins@granpmail.com',
    phoneNumber: '6909006990',

    description: 'Tutto fare, devoto ai clienti e pronto a soddisfarli al meglio, se mi cercate online troverete registrazioini fatte dai miei clienti soddisfatti del lavoro.',

    profession: Profession.Doctor,
    address: 'Via dei Brazzers, 69, Mellitto, 70124',
    isVerified: true,
    hourlyRate: 20,
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
