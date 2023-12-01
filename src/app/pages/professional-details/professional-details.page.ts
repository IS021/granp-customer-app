import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Professional } from 'src/app/models/professionalPublicResponse.model';
import {
  IonItem,
  IonLabel,
  IonList,
  IonAvatar,
  IonContent,
  IonText,
  IonRow, 
  IonCol,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle
  } 
from '@ionic/angular/standalone'

import { Address } from 'src/app/models/Address';
import { GeoLocation } from 'src/app/models/Location';
import { addIcons } from 'ionicons';
import { call, home, personCircleOutline, mailOpenOutline } from 'ionicons/icons';
import { Profession } from 'src/app/models/Profession';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.page.html',
  styleUrls: ['./professional-details.page.scss'],
  standalone: true,
  imports: [CommonModule, 
    FormsModule, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonAvatar, 
    IonContent, 
    IonText, 
    IonRow, 
    IonCol, 
    IonIcon,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonTitle
  ]
})
export class ProfessionalDetailsPage implements OnInit {

  professionalSelected: Professional={
    profilePicture: 'https://i.ytimg.com/vi/7_XURiVa-5M/hqdefault.jpg',
    firstName: 'Johnny',
    lastName: 'Sins',
    email: 'jhonny_tuttofare_sins@granpmail.com',
    birthDate: '01/01/1978',
    phoneNumber: '3939992222',

    description: 'Mio padre soffre di reumatismi a causa della sua ossessione per i cantineri che lo porta a passare intere giornate inpiedi al freddo a guardare gli operai',
    
    profession: Profession.Other,
    address: new Address('','','','', new GeoLocation(0,0)),
    age: 18,
    isVerified: false,

    hourlyRate: 2,
    longTimeJoob: false,
    shortTimeJob: false,
    
  };

  constructor() {
    addIcons({call, home, personCircleOutline, mailOpenOutline});
  }
  ngOnInit() {
  }

}
