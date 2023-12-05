import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Professional } from 'src/app/models/professionalPublicResponse.model';
import { first, from } from 'rxjs';
import { Profession } from 'src/app/models/Profession';
import { Availability } from 'src/app/models/Availability';
import { Gender } from 'src/app/models/Gender';

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
  IonLabel
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
    IonLabel
  ],
})
export class SerachPagePage implements OnInit {
  professionalList: Professional[] = [];

  desiredProfession!: Profession;
  longTermJob!: boolean;
  shortTermJob!: boolean;
  desiredAvailability!: Availability;
  rate!: number;
  desiredGender!: Gender;
  desiredAge!: number;

  constructor() {}

  ngOnInit() {}
}
