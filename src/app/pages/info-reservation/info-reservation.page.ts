import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader, 
  IonLabel, 
  IonList, 
  IonRow, 
  IonText, 
  IonTitle, 
  IonToolbar, 
} from '@ionic/angular/standalone';
import { ReservationResponse, ProfessionalPublicResponse, Gender, Profession, CustomerPublicResponse, ReservationStatus } from 'granp-lib'

@Component({
  selector: 'app-info-reservation',
  templateUrl: './info-reservation.page.html',
  styleUrls: ['./info-reservation.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonRow,
  IonCol,
  IonLabel,
  IonText
  ]
})


export class InfoReservationPage implements OnInit {

  reservationResponse: ReservationResponse={
    id: 'SignorPiomaggio',
    professional: {
      profilePicture: 'lollo',
      firstName: 'Antonio',
      lastName: 'Piomaggio',
      birthDate: '01/01/0001',
      age: 64,
      gender: Gender.Other,
      email: 'piomaggiotuttoattaccato@piomaggio.com',
      phoneNumber: '3334445566',
      description: 'Mi piacciono i droni',
      profession: Profession.Other,
      address: 'Via dei Droni, 3',
      isVerified: true,
      hourlyRate: 22,
      longTimeJob: false,
      shortTimeJob: true
    },
    customer: {
      profilePicture: 'd',
      elderFirstName: 'c',
      elderLastName: 'df',
      elderAddress: 'd',
      elderBirthDate: 'sd',
      elderAge: 23,
      elderGender: Gender.Other,
      elderTelephoneNumber: 'dv',
      elderDescription: 'sd',
      firstName: 'sdc',
      lastName: 'sd',
      phoneNumber: 'wd',
      isElder: true 
    },
    date: '07/12/2023',
    start: '18:08',
    end: '18:38',
    status: ReservationStatus.Accepted
  }

  constructor() { }

  ngOnInit() {
  }

}

