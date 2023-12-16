import { Component, OnInit } from '@angular/core';
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
import { h } from 'ionicons/dist/types/stencil-public-runtime';

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
    start: '08:15',
    end: '09:00',
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
    date: '2023-12-18',
    start: '10:10',
    end: '10:30',
    status: ReservationStatus.Accepted,
  };

  reservationResponse3: ReservationResponse = {
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
    start: '12:10',
    end: '12:30',
    status: ReservationStatus.Accepted,
  };

  allReservations: ReservationResponse[] = [
    this.reservationResponse1,
    this.reservationResponse3
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
            i > parseInt(reservation.start.split(':')[0]) &&
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
    const hourSelected = this.start.split(':')[0];

    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) =>
        timeSlot.weekDay === desiredDay &&
        timeSlot.isAvailable &&
        hourSelected >= timeSlot.startTime.split(':')[0] &&
        hourSelected <= timeSlot.endTime.split(':')[0]
    );
    const minutes: number[] = [];

    if (timeSlots.length === 1) {
      const startAvailable = parseInt(timeSlots[0].startTime.split(':')[1]);
      const endAvailable = parseInt(timeSlots[0].endTime.split(':')[1]);

      //Find all reservations in the selected timeSlot
      const reservations = this.allReservations.filter(
        (reservation) =>
          reservation.date === this.desiredDate.split('T')[0] &&
          reservation.start >= timeSlots[0].startTime &&
          reservation.end <= timeSlots[0].endTime &&
          reservation.status === ReservationStatus.Accepted
      );

      if (hourSelected === timeSlots[0].startTime.split(':')[0]) {
        if (reservations.length === 0) {
          for (let i = startAvailable; i < 60; i++) {
            minutes.push(i);
          }
        } else if (reservations.length !== 0) {
          reservations.forEach((reservation) => {
            if (hourSelected === reservation.start.split(':')[0]) {
              const startReserved = parseInt(reservation.start.split(':')[1]);
              for (let i = startAvailable; i <= startReserved; i++) {
                minutes.push(i);
              }
            }
          });
        }
      } else if (hourSelected === timeSlots[0].endTime.split(':')[0]) {
        for (let i = 0; i <= endAvailable; i++) {
          minutes.push(i);
          //When the start time is equal to the timeSlot end time, the following buttons are not available
        }
      } else if (
        hourSelected > timeSlots[0].startTime.split(':')[0] &&
        hourSelected < timeSlots[0].endTime.split(':')[0]
      ) {
        if (reservations.length === 0) {
          for (let i = 0; i < 60; i++) {
            minutes.push(i);
          }
        } else {
          reservations.forEach((reservation) => {
            if (hourSelected === reservation.start.split(':')[0]) {
              const startReserved = parseInt(reservation.start.split(':')[1]);
              for (let i = 0; i <= startReserved; i++) {
                minutes.push(i);
                //When the start time is equal to another reservation start time, the following buttons are not available
              }
            } else if (hourSelected === reservation.end.split(':')[0]) {
              const endReserved = parseInt(reservation.end.split(':')[1]);
              for (let i = endReserved; i <= 60; i++) {
                minutes.push(i);
              }
            } else {
              for (let i = 0; i < 60; i++) {
                minutes.push(i);
              }
            }
          });
        }
      }
    }
    return minutes;
  }

  selectableEndHours(): number[] {
    const startHour = parseInt(this.start.split(':')[0]);
    const startMinute = parseInt(this.start.split(':')[1]);

    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) =>
        timeSlot.weekDay === desiredDay &&
        timeSlot.isAvailable &&
        this.start >= timeSlot.startTime &&
        this.start <= timeSlot.endTime
    );

    const hours: number[] = [];

    if (timeSlots.length === 1) {
      const startAvailable = parseInt(timeSlots[0].startTime.split(':')[0]);
      const endAvailable = parseInt(timeSlots[0].endTime.split(':')[0]);

      //Find all reservations in the selected timeSlot
      const reservations = this.allReservations.filter(
        (reservation) =>
          reservation.date === this.desiredDate.split('T')[0] &&
          reservation.start >= timeSlots[0].startTime &&
          reservation.end <= timeSlots[0].endTime &&
          reservation.status === ReservationStatus.Accepted
      );

      if (startHour === endAvailable) {
        hours.push(endAvailable);
      } else {
        if (reservations.length === 0) {
          for (let i = startHour; i <= endAvailable; i++) {
            hours.push(i);
          }
        } else {
          reservations.forEach((reservation) => {
            if (startHour === parseInt(reservation.start.split(':')[0])) {
              const startReserved = parseInt(reservation.start.split(':')[1]);
              if (startMinute < startReserved) {
                hours.push(startHour);
              }
            } else if (startHour === parseInt(reservation.end.split(':')[0])) {
              //verify if the end time is equal to the start time of another reservation
              for (let i = startHour; i <= endAvailable; i++) {
                const index = reservations.findIndex(
                  (reservation) =>
                    i === parseInt(reservation.start.split(':')[0])
                );
                if (index === -1) {
                  hours.push(i);
                } else {
                  hours.push(i);
                  i = endAvailable + 1;
                }
              }
            } else {
              for (let i = startHour; i <= endAvailable; i++) {
                hours.push(i);
              }
            }
          });
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
      (timeSlot) =>
        timeSlot.weekDay === desiredDay &&
        timeSlot.isAvailable &&
        this.start >= timeSlot.startTime &&
        this.start <= timeSlot.endTime
    );

    const minutes: number[] = [];

    if (timeSlots.length === 1) {
      const endHourAvailable = parseInt(timeSlots[0].endTime.split(':')[0]);
      const endMinuteAvailable = parseInt(timeSlots[0].endTime.split(':')[1]);

      //Find all reservations in the selected timeSlot
      const reservations = this.allReservations.filter(
        (reservation) =>
          reservation.date === this.desiredDate.split('T')[0] &&
          reservation.start >= timeSlots[0].startTime &&
          reservation.end <= timeSlots[0].endTime &&
          reservation.status === ReservationStatus.Accepted
      );
      let max: number = 60;

      if (startHour === endHour) {
        for (let i = startMinute; i < max; i++) {
          const index = reservations.findIndex(
            (reservation) =>
              parseInt(reservation.start.split(':')[0]) === endHour &&
              i === parseInt(reservation.start.split(':')[1])
          );
          if (index === -1) {
            if (endHour === endHourAvailable) {
              for (let j = 0; j <= endMinuteAvailable; j++) minutes.push(j);
            } else {
              minutes.push(i);
              i = max;
            }
          }
        }
      } else if (endHour === endHourAvailable) {
        for (let i = 0; i <= endMinuteAvailable; i++) {
          const reservationIndex = reservations.findIndex(
            (reservation) =>
              parseInt(reservation.start.split(':')[0]) === endHour &&
              i === parseInt(reservation.start.split(':')[1]));
          if (reservationIndex === -1) {
            minutes.push(i);
          } else {
            minutes.push(i);
            i = endMinuteAvailable + 1;
          }
        }
      } else {
        for (let i = 0; i < max; i++) {
          const reservationIndex = reservations.findIndex(
            (reservation) =>
              parseInt(reservation.start.split(':')[0]) === endHour &&
              i === parseInt(reservation.start.split(':')[1])
          );
          if (reservationIndex === -1) {
            minutes.push(i);
          } else {
            minutes.push(i);
            i = max;
          }
        }
      }
    }
    return minutes;
  }

  isNotAvailable: boolean = true;
  onDateChange(event: any) {
    this.desiredDate = event.detail.value;
  }

  onTimeStartChange(event: any) {
    this.start = event.detail.value;
    const desiredDay = new Date(this.desiredDate).getUTCDay();

    //if availabilityCheck is true, the button is not available
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) =>
        timeSlot.weekDay === desiredDay &&
        timeSlot.isAvailable &&
        this.start >= timeSlot.startTime &&
        this.start <= timeSlot.endTime
    );
    const availabilityCheck = timeSlots.some(
      (timeSlot) => timeSlot.endTime === this.start
    );

    //if reservationCheck is true, the button is not available
    const reservations = this.allReservations.filter(
      (reservation) =>
        reservation.date === this.desiredDate.split('T')[0] &&
        reservation.start >= timeSlots[0].startTime &&
        reservation.end <= timeSlots[0].endTime &&
        reservation.status === ReservationStatus.Accepted
    );
    const reservationCheck = reservations.some(
      (reservation) => reservation.start === this.start
    );

    if (availabilityCheck || reservationCheck) {
      this.isNotAvailable = true;
    } else {
      this.isNotAvailable = false;
    }
  }

  onStartHourSetChange(event: any) {
    this.start = event.detail.value;
    this.startNotSet = false;
  }

  onEndHourSetChange(event: any) {
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
