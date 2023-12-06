import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

<<<<<<< HEAD
import { Gender, Profession, Availability, ProfessionalPublicResponse } from 'granp-lib';
=======
import { Professional } from 'src/app/models/professionalPublicResponse.model';
import { first, from } from 'rxjs';
import { Profession } from 'src/app/models/Profession';
import { Availability } from 'src/app/models/Availability';
import { Gender } from 'src/app/models/Gender';
>>>>>>> 6950c7b1c71a39cf12568b3c49cca70029612898

import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonTextarea,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonText,
  IonCheckbox,
  IonDatetime,
  IonRange,
  IonModal,
  IonDatetimeButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-serach-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonFooter,
    IonTextarea,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonTabs,
    IonTabBar, 
    IonTabButton,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonText,
    IonCheckbox,
    IonDatetime,
    IonRange,
    IonDatetimeButton,
    IonModal
  ],
})
export class SerachPagePage implements OnInit {
  professionalList: ProfessionalPublicResponse[] = [];

  desiredProfession!: Profession;
  longTimeJob: boolean = false;
  shortTimeJob: boolean = false;
  desiredAvailability!: Availability;
  rate!: number;
  desiredGender!: Gender;
  desiredDate!: string; 

  startHour!: string;
  endHour!: string;

  desiredAge = {lower: 21, upper: 65}  // [minAge, maxAge]

  updateRange(event: any) {
    if (event.detail.value.lower < 21) {
      this.desiredAge.lower = 21;
    }
    if (event.detail.value.upper > 65) {
      this.desiredAge.upper = 65;
    }
  }

  /* Rating information */
  stars: number[] = [1, 2, 3, 4, 5];
  desiredRating: number = 0;
  isMouseOver : boolean = true;

  public data: any;

  countStar(star: number) {
    this.isMouseOver = false;
    this.desiredRating = star;
    this.data = this.desiredRating;
    console.log('star rating is: ', this.data);
  }

  addClass(star: number) {
    if (this.isMouseOver) {
      this.desiredRating = star;
    }
  }

  removeClass() {
    if (this.isMouseOver) {
      this.desiredRating = 0;
    }
  }

  setStartHour(event: any) {
    this.startHour = event.detail.value;
  }

  setEndHour(event: any) {
    this.endHour = event.detail.value;
  }

  constructor() {
    addIcons ({star});
  }


  ngOnInit() {}
}
