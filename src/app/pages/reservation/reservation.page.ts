import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonDatetime,
  IonModal,
  IonInput,
  IonLabel,
  IonDatetimeButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import {
  Address,
  Gender,
  Profession,
  ReservationRequest,
  ReservationResponse,
  ReservationStatus,
  TimeSlotResponse,
  TimeTableResponse,
} from 'granp-lib';
import { fromEvent, min } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonDatetime,
    IonModal,
    IonInput,
    IonLabel,
    IonDatetimeButton,
    IonButton,
    IonIcon,
  ],
})
export class ReservationPage implements OnInit {
  minDate: string;
  maxDate: string;

  //Reservation request from the current customer
  reservationRequest!: ReservationRequest;

  desiredDate!: string;

  prova: string = '08:00';

  start: string = '08:00';
  end: string = '09:00';

  startNotSet: boolean = true;
  endNotSet: boolean = true;

  //Reservation responses provided by the professional
  reservationResponses: ReservationResponse[] = [];

  //Professional availabilities
  timeTable: TimeTableResponse = {
    weeksInAdvance: 5,
    timeSlots: [
      {
        weekDay: 1,
        startTime: '08:15',
        endTime: '12:30',
        isAvailable: true,
      },
      {
        weekDay: 1,
        startTime: '14:00',
        endTime: '18:00',
        isAvailable: true,
      },
      {
        weekDay: 2,
        startTime: '08:00',
        endTime: '12:00',
        isAvailable: true,
      },
    ],
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
      shortTimeJob: true,
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
      isElder: true,
    },
    date: '2023-12-18',
    start: '09:00',
    end: '10:00',
    status: ReservationStatus.Accepted,
  };

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
      shortTimeJob: true,
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
      isElder: true,
    },
    date: '2023-12-26',
    start: '08:00',
    end: '10:00',
    status: ReservationStatus.Declined,
  };

  allReservations: ReservationResponse[] = [
    this.reservationResponse1,
    this.reservationResponse2,
  ];

  isAvailable = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    const availabilityCheck = this.timeTable.timeSlots.find(
      (timeSlot) => timeSlot.weekDay === utcDay && timeSlot.isAvailable
    );
    //const reservationCheck = this.allReservations.find((reservation) => reservation.date === dateString && reservation.status === ReservationStatus.Accepted );

    return availabilityCheck;
  };

  selectableStartHours(): number[] {
    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) => timeSlot.weekDay === desiredDay && timeSlot.isAvailable
    );
    const hours: number[] = [];

    timeSlots.forEach((timeSlot) => {
      const startAvailable = parseInt(timeSlot.startTime.split(':')[0]);
      const endAvailable = parseInt(timeSlot.endTime.split(':')[0]);

      for (let i = startAvailable; i <= endAvailable; i++) {
        const isReserved = this.allReservations.some(
          (reservation) =>
            reservation.date === this.desiredDate.split('T')[0] &&
            i >= parseInt(reservation.start.split(':')[0]) &&
            i < parseInt(reservation.end.split(':')[0]) &&
            reservation.status === ReservationStatus.Accepted
        );
        if (!isReserved) {
          hours.push(i);
        }
      }
    });
    return hours;
  }

  selectableStartMinutes(): number[] {
    const startHour = parseInt(this.start.split(':')[0]);
    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) => timeSlot.weekDay === desiredDay && timeSlot.isAvailable
    );
    const minutes: number[] = [];

    timeSlots.forEach((timeSlot) => {
      const startAvailable = parseInt(timeSlot.startTime.split(':')[1]);

      if (startHour === parseInt(timeSlot.startTime.split(':')[0])) {
        for (let i = startAvailable; i < 60; i++) {
          minutes.push(i);
        }
      } else if (startHour > parseInt(timeSlot.startTime.split(':')[0])) {
        const indexReserved = this.allReservations.findIndex(
          (reservation) =>
            reservation.date === this.desiredDate.split('T')[0] &&
            startHour === parseInt(reservation.end.split(':')[0]) &&
            reservation.status === ReservationStatus.Accepted
        );
        if (indexReserved !== -1) {
          if (
            startHour ===
            parseInt(this.allReservations[indexReserved].end.split(':')[0])
          ) {
            const endReserved = parseInt(
              this.allReservations[indexReserved].end.split(':')[1]
            );
            for (let i = endReserved; i < 60; i++) {
              minutes.push(i);
            }
          }
        }
      }
    });
    return minutes;
  }

  selectableEndHours(): number[] {
    const start = parseInt(this.start.split(':')[0]);

    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) => timeSlot.weekDay === desiredDay && timeSlot.isAvailable
    );
    const hours: number[] = [];

    const index = timeSlots.findIndex(
      (timeSlot) =>
        start >= parseInt(timeSlot.startTime.split(':')[0]) &&
        start < parseInt(timeSlot.endTime.split(':')[0])
    );

    if (index !== -1) {
      const startAvailable = parseInt(timeSlots[index].startTime.split(':')[0]);
      const endAvailable = parseInt(timeSlots[index].endTime.split(':')[0]);

      for (let i = startAvailable; i <= endAvailable; i++) {
        const indexReserved = this.allReservations.findIndex(
          (reservation) =>
            reservation.date === this.desiredDate.split('T')[0] &&
            start < parseInt(reservation.start.split(':')[0]) &&
            reservation.status === ReservationStatus.Accepted
        );
        if (indexReserved === -1 && i >= start) {
          hours.push(i);
        } else if (indexReserved !== -1) {
          if (
            start <
            parseInt(this.allReservations[indexReserved].start.split(':')[0])
          ) {
            const endReserved = parseInt(
              this.allReservations[indexReserved].end.split(':')[0]
            );
            if (i < endReserved) {
              for (let j = i; j < endReserved; j++) {
                hours.push(j);
              }
            }
          }
        }
      }
    }
    return hours;
  }

  selectableEndMinutes(): number[] {
    const startHour = parseInt(this.start.split(':')[0]);
    const startMinute = parseInt(this.start.split(':')[1]);
    const endHour = parseInt(this.end.split(':')[0]);

    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) => timeSlot.weekDay === desiredDay && timeSlot.isAvailable
    );
    const minutes: number[] = [];

    
    const index = timeSlots.findIndex(
      (timeSlot) =>
        startHour >= parseInt(timeSlot.startTime.split(':')[0]) &&
        startHour < parseInt(timeSlot.endTime.split(':')[0])
    );

      if (index !== -1) {
      const endAvailable = parseInt(timeSlots[index].endTime.split(':')[1]);

      if (startHour === endHour) {
        for (let i = startMinute; i < 60; i++) {
          const indexReserved = this.allReservations.findIndex(
            (reservation) =>
              reservation.date === this.desiredDate.split('T')[0] &&
              endHour === parseInt(reservation.start.split(':')[0]) &&
              i >= parseInt(reservation.start.split(':')[1]) &&
              reservation.status === ReservationStatus.Accepted
          );
          if (indexReserved !== -1) {
            if (
              endHour ===
              parseInt(this.allReservations[indexReserved].start.split(':')[0])
            ) {
              const startReserved = parseInt(
                this.allReservations[indexReserved].start.split(':')[1]
              );
              for (let j = startMinute; j < startReserved; j++) {
                minutes.push(j);
              }
            }
          } else {
            minutes.push(i);
          }
        }
      } else if (endHour === parseInt(timeSlots[index].endTime.split(':')[0])) {
        for (let i = 0; i <= endAvailable; i++) {
          minutes.push(i);
        }
      } else if (endHour < parseInt(timeSlots[index].endTime.split(':')[0])) {
        for (let i = 0; i < 60; i++) {
          const indexReserved = this.allReservations.findIndex(
            (reservation) =>
              reservation.date === this.desiredDate.split('T')[0] &&
              endHour === parseInt(reservation.start.split(':')[0]) &&
              i >= parseInt(reservation.start.split(':')[1]) &&
              reservation.status === ReservationStatus.Accepted
          );
          if (indexReserved !== -1) {
            if (
              endHour ===
              parseInt(this.allReservations[indexReserved].start.split(':')[0])
            ) {
              const startReserved = parseInt(
                this.allReservations[indexReserved].start.split(':')[1]
              );
              for (let j = 0; j < startReserved; j++) {
                minutes.push(j);
              }
            }
          } else {
            minutes.push(i);
          }
        }
      }
    };
    return minutes;
  }

  isNotAvailable: boolean = true;
  onDateChange(event: any) {
    this.desiredDate = event.detail.value;
  }

  onTimeStartChange(event: any) {
    this.start = event.detail.value;
    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) => timeSlot.weekDay === desiredDay && timeSlot.isAvailable
    );
    this.isNotAvailable = timeSlots.some(
      (timeSlot) => timeSlot.endTime === this.start
    );
  }

  onStartSetChange(event: any) {
    this.start = event.detail.value;
    this.startNotSet = false;
  }

  onEndSetChange(event: any) {
    this.end = event.detail.value;
    this.endNotSet = false;
  }

  confirmReservation() {
    const date = this.desiredDate.split('T')[0];
    const reservationRequest: ReservationRequest = {
      professionalId: 'SignorPiomaggio',
      start: new Date(date + 'T' + this.start),
      end: new Date(date + 'T' + this.end),
    };
    this.reservationRequest = reservationRequest;
    console.log(this.reservationRequest);
    
  }

  constructor() {
    this.minDate = new Date().toISOString();

    //Define maxDate from today to a fixed number of weeks in advance
    const date = new Date();
    date.setDate(date.getDate() + this.timeTable.weeksInAdvance * 7);
    this.maxDate = date.toISOString();
  }

  ngOnInit() {}
}
