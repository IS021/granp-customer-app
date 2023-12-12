import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonDatetime, IonModal, IonInput, IonLabel, IonDatetimeButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Address, Gender, Profession, ReservationRequest, ReservationResponse, ReservationStatus, TimeSlotResponse, TimeTableResponse } from 'granp-lib';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonDatetime, IonModal, IonInput, IonLabel, IonDatetimeButton, IonButton, IonIcon ]
})
export class ReservationPage implements OnInit {

  minDate: string;
  maxDate: string;


  //Reservation request from the current customer
  reservationRequest!: ReservationRequest;

  desiredDate!: string;
  
  start: string = '08:00';
  end: string = '09:00';

  //Reservation responses provided by the professional
  reservationResponses: ReservationResponse[] = [];

  //Professional availabilities
  timeTable: TimeTableResponse  = {
    weeksInAdvance: 5,
    timeSlots: [
      {
        weekDay:1,
        startTime: '08:00',
        endTime: '12:00',
        isAvailable: true
      },
      {
        weekDay:1,
        startTime: '14:00',
        endTime: '18:00',
        isAvailable: true
      },
      {
        weekDay:2,
        startTime: '08:00',
        endTime: '12:00',
        isAvailable: true
      }
    ]
  };

  reservationResponse1: ReservationResponse = {
    id: 'SignorPiomaggio',
    professional: {
        id: 'SignorPiomaggio',
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
        address: new Address(),
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
        elderBirthDate: 'sd',
        elderAge: 23,
        elderTelephoneNumber: 'dv',
        elderDescription: 'sd',
        firstName: 'sdc',
        lastName: 'sd',
        phoneNumber: 'wd',
        isElder: true
    },
    date: '2023-12-18',
    start: '08:00',
    end: '10:00',
    status: ReservationStatus.Accepted
}

reservationResponse2: ReservationResponse = {
    id: 'SignorPiomaggio',
    professional: {
        id: 'SignorPiomaggio',
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
        address: new Address(),
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
        elderBirthDate: 'sd',
        elderAge: 23,
        elderTelephoneNumber: 'dv',
        elderDescription: 'sd',
        firstName: 'sdc',
        lastName: 'sd',
        phoneNumber: 'wd',
        isElder: true
    },
    date: '2023-12-26',
    start: '18:08',
    end: '18:38',
    status: ReservationStatus.Declined
  }

  allReservations: ReservationResponse[] = [this.reservationResponse1, this.reservationResponse2];

  isAvailable = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    const availabilityCheck = this.timeTable.timeSlots.find((timeSlot) => timeSlot.weekDay === utcDay && timeSlot.isAvailable);
    const reservationCheck = this.allReservations.find((reservation) => reservation.date === dateString && reservation.status === ReservationStatus.Accepted);

    return availabilityCheck && !reservationCheck;
  };

 //Define the available time slots based on start and end time selected by the customer
 selectableStartHours(): number[] {
  return [0,1,2,3,4,5,6];
 }

 validateTime(event: any) {
  const selectedTime = event.detail.value;
  const time = new Date(selectedTime);
  const hour = time.getHours();
  const minute = time.getMinutes();
 
  // Define the time slots you want to disable
  const disabledTimeSlots = [
   { hour: 12, minute: 0 },
   { hour: 14, minute: 30 },
   // Add more time slots as needed
  ];
 
  for (let i = 0; i < disabledTimeSlots.length; i++) {
   if (hour === disabledTimeSlots[i].hour && minute === disabledTimeSlots[i].minute) {
     // If the selected time is in the disabled list, reset the time
    event.target.value = null;
     console.log('Selected time is disabled');
     break;
   }
  }
 }
  
  //Check if the selected start time is available respecting the professional's time table or not reserved by another customer ???

  confirmReservation() {
    console.log(this.timeTable.timeSlots);
  }



  constructor() { 
    this.minDate = new Date().toISOString();

    //Define maxDate from today to a fixed number of weeks in advance
    const date = new Date();
    date.setDate(date.getDate() + this.timeTable.weeksInAdvance * 7);
    this.maxDate = date.toISOString();
  }


  ngOnInit() {
  }

}
