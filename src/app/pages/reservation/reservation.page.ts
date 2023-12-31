import { Component, OnInit, inject } from '@angular/core';
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
  NavController,
} from '@ionic/angular/standalone';
import {
  Address,
  Gender,
  Profession,
  ReservationPublicResponse,
  ReservationRequest,
  ReservationResponse,
  ReservationService,
  ReservationStatus,
  SearchService,
  TimeSlotResponse,
  TimeTableResponse,
} from 'granp-lib';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  activatedRoute = inject(ActivatedRoute);
  navCtrl = inject(NavController);
  reservationService = inject(ReservationService);
  searchService = inject(SearchService);
  toastController = inject(ToastController);

  professionalId: string;

  minDate!: string;
  maxDate!: string;

  desiredDate!: string;

  start: string = '08:00';
  end: string = '09:00';

  startNotSet: boolean = true;
  endNotSet: boolean = true;

  timeTable?: TimeTableResponse;
  allReservations?: ReservationPublicResponse[] = [];

  ngOnInit() {}

  constructor() {
    this.professionalId = this.activatedRoute.snapshot.params['id'];

    this.searchService.professionalInfo(this.professionalId).then((response) => {
            this.timeTable = response.timeTable;
            this.allReservations = response.reservations;

            if(this.timeTable === undefined) { 
                return;
            }

            // Define maxDate from today to a fixed number of weeks in advance
            this.minDate = new Date().toISOString();
            const date = new Date();
            
            date.setDate(date.getDate() + this.timeTable.weeksInAdvance * 7 + 1);
            
            this.maxDate = date.toISOString();
        });
  }

  isAvailable = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    const availabilityCheck = this.timeTable?.timeSlots.find(
      (timeSlot) => timeSlot.weekDay === utcDay && timeSlot.isAvailable
    );

    // const reservationCheck = this.allReservations.find((reservation) => reservation.date === dateString && reservation.status === ReservationStatus.Accepted );

    return availabilityCheck;
  };

  selectableStartHours(): number[] {
    if (this.timeTable === undefined) {
      return [];
    }

    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable.timeSlots.filter(
      (timeSlot) => timeSlot.weekDay === desiredDay && timeSlot.isAvailable
    );
    const hours: number[] = [];

    timeSlots.forEach((timeSlot) => {
      const startAvailable = parseInt(timeSlot.startTime.split(':')[0]);
      const endAvailable = parseInt(timeSlot.endTime.split(':')[0]);

      for (let i = startAvailable; i <= endAvailable; i++) {
        const isReserved = this.allReservations?.some(
          (reservation) =>
            reservation.start.split('T')[0] ===
              this.desiredDate.split('T')[0] &&
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
    const timeSlots = this.timeTable!.timeSlots.filter(
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
      const reservations = this.allReservations!.filter(
        (reservation) =>
          reservation.start.split('T')[0] === this.desiredDate.split('T')[0] &&
          reservation.start.split('T')[1].split(':')[0] >=
            timeSlots[0].startTime.split(':')[0] &&
          reservation.end.split('T')[1].split(':')[0] <=
            timeSlots[0].endTime.split(':')[0] &&
          reservation.status === ReservationStatus.Accepted
      );

      if (hourSelected === timeSlots[0].startTime.split(':')[0]) {
        if (reservations.length === 0) {
          for (let i = startAvailable; i < 60; i++) minutes.push(i);
        } else {
          reservations.forEach((reservation) => {
            if (
              hourSelected === reservation.start.split('T')[1].split(':')[0]
            ) {
              const startReserved = parseInt(
                reservation.start.split('T')[1].split(':')[1]
              );
              for (let i = startAvailable; i <= startReserved; i++) {
                minutes.push(i);
              }
            } else {
              for (let i = startAvailable; i < 60; i++) {
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
          const index = reservations.findIndex(
            (reservation) =>
              hourSelected === reservation.start.split('T')[1].split(':')[0] ||
              hourSelected === reservation.end.split('T')[1].split(':')[0]
          );
          if (index === -1) {
            for (let i = 0; i < 60; i++) {
              minutes.push(i);
            }
          } else {
            const startReserved = parseInt(
              reservations[index].start.split('T')[1].split(':')[1]
            );
            const endReserved = parseInt(
              reservations[index].end.split('T')[1].split(':')[1]
            );
            if (
                hourSelected ===
                  reservations[index].start.split('T')[1].split(':')[0] &&
                hourSelected ===
                  reservations[index].end.split('T')[1].split(':')[0]
              ) {
                const startReserved = parseInt(
                  reservations[index].start.split('T')[1].split(':')[1]
                );
                const endReserved = parseInt(
                  reservations[index].end.split('T')[1].split(':')[1]
                );
                if (
                  hourSelected ===
                  reservations[index].start.split('T')[1].split(':')[0]
                ) {
                  for (let i = 0; i <= startReserved; i++) {
                    minutes.push(i);
                  }
                }
                for (let i = endReserved; i <= 60; i++) {
                  minutes.push(i);
                }
              } else if (
              hourSelected ===
              reservations[index].end.split('T')[1].split(':')[0]
            ) {
              for (let i = endReserved; i <= 60; i++) {
                minutes.push(i);
              }
            } else if (
                hourSelected ===
                reservations[index].start.split('T')[1].split(':')[0]
              ) {
                for (let i = 0; i <= startReserved; i++) {
                  minutes.push(i);
                }
              }
          }
        }
      }
    }
    return minutes;
  }

  selectableEndHours(): number[] {
    const startHour = parseInt(this.start.split(':')[0]);
    const startMinute = parseInt(this.start.split(':')[1]);

    const desiredDay = new Date(this.desiredDate).getUTCDay();
    const timeSlots = this.timeTable!.timeSlots.filter(
      (timeSlot) =>
        timeSlot.weekDay === desiredDay &&
        timeSlot.isAvailable &&
        this.start >= timeSlot.startTime.split(':')[0] &&
        this.start <= timeSlot.endTime.split(':')[0]
    );

    const hours: number[] = [];

    if (timeSlots.length === 1) {
      const startAvailable = parseInt(timeSlots[0].startTime.split(':')[0]);
      const endAvailable = parseInt(timeSlots[0].endTime.split(':')[0]);

      //Find all reservations in the selected timeSlot
      const reservations = this.allReservations!.filter(
        (reservation) =>
          reservation.start.split('T')[0] === this.desiredDate.split('T')[0] &&
          reservation.start.split('T')[1].split(':')[0] >=
            timeSlots[0].startTime.split(':')[0] &&
          reservation.end.split('T')[1].split(':')[0] <=
            timeSlots[0].endTime.split(':')[0] &&
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
          const index = reservations.findIndex(
            (reservation) =>
              startHour ===
                parseInt(reservation.start.split('T')[1].split(':')[0]) ||
              startHour ===
                parseInt(reservation.end.split('T')[1].split(':')[0])
          );
          if (index === -1) {
            for (let i = startHour; i <= endAvailable; i++) {
              hours.push(i);
            }
          } else {
            const startReserved = parseInt(
              reservations[index].start.split('T')[1].split(':')[1]
            );
            const endReserved = parseInt(
              reservations[index].end.split('T')[1].split(':')[1]
            );
            if (startMinute <= startReserved) {
              const index1 = reservations.findIndex(
                (reservation) =>
                  parseInt(reservation.start.split('T')[1].split(':')[0]) >= startHour
              );
              if (index1 === -1) {
                hours.push(startHour);
              } else {
                const end = parseInt(reservations[index1].start.split('T')[1].split(':')[0]);
                for (let i = startHour; i <= end; i++) {
                  hours.push(i);
                }
              }
            } else if (startMinute >= endReserved) {
              let max = endAvailable;
              //verify if the end time is equal to the start time of another reservation
              for (let i = startHour; i <= max; i++) {
                const index1 = reservations.findIndex(
                  (reservation) =>
                    i + 1 ===
                    parseInt(reservation.start.split('T')[1].split(':')[0])
                );
                if (index1 === -1) {
                  hours.push(i);
                } else {
                  hours.push(i);
                  max = parseInt(
                    reservations[index1].start!.split('T')[1].split(':')[0]
                  );
                }
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
    const timeSlots = this.timeTable!.timeSlots.filter(
      (timeSlot) =>
        timeSlot.weekDay === desiredDay &&
        timeSlot.isAvailable &&
        this.start >= timeSlot.startTime.split(':')[0] &&
        this.start <= timeSlot.endTime.split(':')[0]
    );

    const minutes: number[] = [];

    if (timeSlots.length === 1) {
      const endHourAvailable = parseInt(timeSlots[0].endTime.split(':')[0]);
      const endMinuteAvailable = parseInt(timeSlots[0].endTime.split(':')[1]);

      //Find all reservations in the selected timeSlot
      const reservations = this.allReservations!.filter(
        (reservation) =>
          reservation.start.split('T')[0] === this.desiredDate.split('T')[0] &&
          reservation.start.split('T')[1].split(':')[0] >=
            timeSlots[0].startTime.split(':')[0] &&
          reservation.end.split('T')[1].split(':')[0] <=
            timeSlots[0].endTime.split(':')[0] &&
          reservation.status === ReservationStatus.Accepted
      );
      let max: number = 60;

      if (startHour === endHour) {
        for (let i = startMinute; i < max; i++) {
          const index = reservations.findIndex(
            (reservation) =>
              parseInt(reservation.start.split('T')[1].split(':')[0]) ===
                endHour &&
              i === parseInt(reservation.start.split('T')[1].split(':')[1])
          );
          if (index === -1) {
            if (endHour === endHourAvailable) {
              minutes.push(i);
              max = endMinuteAvailable;
            } else {
              minutes.push(i);
            }
          } else {
            if (
              endHour ===
              parseInt(reservations[index].start.split('T')[1].split(':')[0])
            ) {
              minutes.push(i);
              max = parseInt(
                reservations[index].start!.split('T')[1].split(':')[1]
              );
            }
          }
        }
      } else if (endHour === endHourAvailable) {
        for (let i = 0; i <= endMinuteAvailable; i++) {
          const reservationIndex = reservations.findIndex(
            (reservation) =>
              parseInt(reservation.start.split('T')[1].split(':')[0]) ===
                endHour &&
              i === parseInt(reservation.start.split('T')[1].split(':')[1])
          );
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
              parseInt(reservation.start.split('T')[1].split(':')[0]) ===
                endHour &&
              i === parseInt(reservation.start.split('T')[1].split(':')[1])
          );
          if (reservationIndex === -1) {
            minutes.push(i);
          } else {
            minutes.push(i);
            max = parseInt(
              reservations[reservationIndex].start!.split('T')[1].split(':')[1]
            );
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
    const timeSlots = this.timeTable!.timeSlots.filter(
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
    const reservations = this.allReservations!.filter(
      (reservation) =>
        reservation.start.split('T')[0] === this.desiredDate.split('T')[0] &&
        reservation.start.split('T')[1].split(':')[0] >=
          timeSlots[0].startTime.split(':')[0] &&
        reservation.end.split('T')[1].split(':')[0] <=
          timeSlots[0].endTime.split(':')[0] &&
        reservation.status === ReservationStatus.Accepted
    );
    const reservationCheck = reservations.some(
      (reservation) =>
        reservation.start.split('T')[1].split(':')[0] ===
          this.start.split(':')[0] &&
        reservation.start.split('T')[1].split(':')[1] ===
          this.start.split(':')[1]
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
      professionalId: this.professionalId,
      //when JSON.stringify is used, the date is 1 hour before the selected date
      start: new Date(date + 'T' + this.start + ':00Z'),
      end: new Date(date + 'T' + this.end + ':00Z'),
    };

    console.log(reservationRequest);
    this.reservationService.request(reservationRequest).then((response) => {
        this.navCtrl.back();
        this.toastController.create({
            message: 'La tua richiesta è stata inviata con successo!',
            duration: 2000,
            color: 'success',
            }).then((toast) => {
                toast.present();
            });
    }).catch((error) => {
        this.toastController.create({
            message: 'Si è verificato un errore, riprova più tardi',
            duration: 2000,
            color: 'danger',
            }).then((toast) => {
                toast.present();
            });
        });
}

  navigateBack() {
    this.navCtrl.back();
  }
}
