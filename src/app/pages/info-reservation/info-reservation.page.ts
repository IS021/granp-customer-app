import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { personOutline, medicalOutline, calendarOutline, timeOutline, ellipsisHorizontal, checkmarkOutline, closeOutline, trashOutline, chatboxOutline } from 'ionicons/icons';
import { 
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonRow, 
  IonText, 
  IonTitle, 
  IonToolbar, 
  IonButton
} from '@ionic/angular/standalone';
import { ReservationResponse, ProfessionalPublicResponse, Gender, Profession, CustomerPublicResponse, ReservationStatus, Address } from 'granp-lib'
import { addIcons } from 'ionicons';

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
  IonText,
  IonItem,
  IonIcon,
  IonButton  
]
})


export class InfoReservationPage implements OnInit {

  reservationResponse: ReservationResponse={
    id: 'SignorPiomaggio',
    professional: {
        id: "",
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
      address: new Address(), //'Via dei Droni, 3',
      isVerified: true,
      hourlyRate: 22,
      longTimeJob: false,
      shortTimeJob: true
    },
    customer: {
      profilePicture: 'd',
      elderFirstName: 'c',
      elderLastName: 'df',
      elderAddress: new Address(),
      elderAge: 23,
      elderPhoneNumber: 'dv',
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

  constructor(private router: Router) { 
    addIcons({ personOutline, medicalOutline, calendarOutline, timeOutline, ellipsisHorizontal, checkmarkOutline, closeOutline, trashOutline, chatboxOutline })
  }

  ngOnInit() {
  }

  navigateToAnotherPage() {
    // Define the route you want to navigate to
    const destinationRoute = '/professional-details'; // Update with your actual route

    // Use the router to navigate to the destination page
    this.router.navigate([destinationRoute]);
}

checkStatus(): string {
  switch (this.reservationResponse.status) {
    case ReservationStatus.Pending:
      return 'In attesa di conferma';
    case ReservationStatus.Accepted:
      return 'Prenotazione accettata';
    case ReservationStatus.Declined:
      return 'Prenotazione declinata';
    case ReservationStatus.Cancelled:
      return 'Prenotazione cancellata';
  }
}

checkStatusIcon(): string {
  switch (this.reservationResponse.status) {
    case ReservationStatus.Pending:
      return 'ellipsis-horizontal';
    case ReservationStatus.Accepted:
      return 'checkmark-outline';
    case ReservationStatus.Declined:
      return 'close-outline';
    case ReservationStatus.Cancelled:
      return 'trash-outline';
  }
}

checkStatusIconColor(): string {
  switch (this.reservationResponse.status) {
    case ReservationStatus.Pending:
      return 'warning';
    case ReservationStatus.Accepted:
      return 'success';
    case ReservationStatus.Declined:
      return 'danger';
    case ReservationStatus.Cancelled:
      return 'danger';
  }
}

showCancelButton(): boolean {
  // Only show the cancel button if the status is 'Pending' or 'Accepted'
  return (
    this.reservationResponse.status === ReservationStatus.Pending ||
    this.reservationResponse.status === ReservationStatus.Accepted
  );
}


}