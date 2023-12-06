import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Gender, Profession, Availability, ProfessionalPublicResponse } from 'granp-lib';

import { addIcons } from 'ionicons';
import { starOutline } from 'ionicons/icons';

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
  IonRange
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
    IonRange
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
  desiredAge!: number; 
  desiredDate!: string; 

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
      console.log('star rating is: ', this.desiredRating);
    }
  }

  removeClass() {
    if (this.isMouseOver) {
      this.desiredRating = 0;
      console.log('star rating is: ', this.desiredRating);
    }
  }

  constructor() {
    addIcons ({starOutline});
  }

  ngOnInit() {}
}
