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
  IonLabel,
  IonInput,
  IonAvatar,
  IonRow,
  IonCol,
  IonIcon,
  IonButtons,
  IonButton,
  IonTextarea,
  IonListHeader,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

import {
  CustomerProfileRequest,
  Address,
  Gender,
  ImageSelectorComponent,
  AddressSelectorComponent,
  BirthdateSelectorComponent,
} from 'granp-lib';

import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  mail,
  call,
  pencilOutline,
  home,
  calendarOutline,
  maleOutline,
  femaleOutline,
  helpOutline,
  closeOutline,
  checkmarkOutline,
  mailOutline,
} from 'ionicons/icons';

import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { MaskitoModule } from '@maskito/angular';


@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.page.html',
  styleUrls: ['./modify-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaskitoModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonAvatar,
    IonRow,
    IonCol,
    IonIcon,
    IonButtons,
    IonButton,
    IonTextarea,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    ImageSelectorComponent,
    AddressSelectorComponent,
    BirthdateSelectorComponent
  ],
})
export class ModifyProfilePage implements OnInit {
  customerLogged: CustomerProfileRequest = {
    isElder: false,
    profilePicture:
      'https://www.repstatic.it/content/nazionale/img/2017/09/12/095727836-c36c7100-6020-40fd-ab27-f58df42b576c.jpg',

    elderFirstName: 'Jhon',
    elderLastName: 'Doe',
    elderAddress: Object.assign(new Address(), {
      Street: 'Via Roma',
      StreetNumber: '1',
      City: 'Roma',
      ZipCode: '00100',
      Location: { Latitude: 0, Longitude: 0 }, // Replace with actual values
    }),
    elderBirthDate: '01/01/1900',
    elderGender: Gender.Male,
    elderPhoneNumber: '+39 112 345 6789',
    elderDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, vitae aliquam nisl nisl vitae nisl. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, vitae aliquam nisl nisl vitae nisl.',

    firstName: 'Alessandro',
    lastName: 'Perna',
    email: 'alessandroperna@gmail.com',
    phoneNumber: '+39 390 456 7890',
  };

  editingProfile: boolean = false;

  constructor() {
    addIcons({
      personCircleOutline,
      mail,
      call,
      pencilOutline,
      home,
      calendarOutline,
      maleOutline,
      femaleOutline,
      helpOutline,
      closeOutline,
      checkmarkOutline,
      mailOutline,
    });
  }

  toggleBoolean() {
    this.editingProfile = !this.editingProfile;
  }

  checkGender(): string {
    switch (this.customerLogged.elderGender) {
      case Gender.Male:
        return 'Uomo';
      case Gender.Female:
        return 'Donna';
      default:
        return 'Non definito';
    }
  }

  checkGenderIcon(): string {
    switch (this.customerLogged.elderGender) {
      case Gender.Male:
        return 'male-outline';
      case Gender.Female:
        return 'female-outline';
      default:
        return 'help-outline';
    }
  }

  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '3', '9', ' ', /\b[1-9]\b/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
};

readonly maskPredicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  submitChanges() {
    this.editingProfile = false;
    console.log(this.customerLogged.elderGender.valueOf());
  }

  ngOnInit() {}
}
