import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonDatetime, IonModal, IonInput } from '@ionic/angular/standalone';
import { ReservationRequest } from 'granp-lib';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonDatetime, IonModal, IonInput ]
})
export class ReservationPage implements OnInit {

  reservationRequest?: ReservationRequest;

  constructor() { }

  ngOnInit() {
  }

}
