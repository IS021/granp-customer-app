import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import {
  IonItem,
  IonLabel,
  IonList,
  IonAvatar,
  IonContent,
  IonText,
  IonRow, 
  IonCol
  } 
from '@ionic/angular/standalone'
import { Address } from 'src/app/models/Address';
import { GeoLocation } from 'src/app/models/Location';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.page.html',
  styleUrls: ['./customer-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonItem, IonLabel, IonList, IonAvatar, IonContent, IonText, IonRow, IonCol]
})
export class CustomerDetailsPage implements OnInit {

  customerLogged: Customer={
    firstName: 'Pinuccio',
    lastName: 'Battiato',
    email: 'pinuccio_battiato@granpmail.com',
    birthDate: '01/01/1978',
    address: new Address('Via dei Cavalli', '14/B', 'Monopoli', '70170', new GeoLocation(0, 0)),
    phoneNumber: '3939992222',
    elderDescription: 'Mio padre soffre di reumatismi a causa della sua ossessione per i cantineri che lo porta a passare intere giornate inpiedi al freddo a guardare gli operai',
    elderFirstName: 'Franco',
    elderLastName: 'Battiato',
    elderBirthDate: '25/12/0000',
    elderAddress: new Address('Via delle Stalle', '17/A', 'Betlemme', '20090', new GeoLocation(0, 0)),
    elderTelephoneNumber: '6666660000',
    profilePicture: 'https://www.inchiestaonline.it/wp-content/uploads/2021/05/Battiato.jpg',
    isNotElder: false,
  };

  constructor() {
  }

  ngOnInit() {
  }

}
