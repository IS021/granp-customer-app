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
import { Reservation } from 'src/app/models/Reservation';
import { Profession } from 'src/app/models/Profession';

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

  reservationSelected: Reservation={
    firstName: 'Alessandro',
    lastName: 'Perna',
    profession: Profession.Physiotherapist,

    isAtHome: true,
    date: '07/12/2023',
    startHour: '8:30',
    endHour: '9:00'
  }

  constructor() { }

  ngOnInit() {
  }

}

