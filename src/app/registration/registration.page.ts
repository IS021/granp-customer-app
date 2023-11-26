import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { Customer } from '../customer.model';

import { ChangeDetectionStrategy } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.css'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements OnInit {
[x: string]: any;
  //customer!: Customer;
  customer: Customer = {
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    phoneNumber: '',
    elderDescription: '',
    elderFirstName: '',
    elderLastName: '',
    elderBirthDate: '',
    elderAddress: '',
    elderTelephoneNumber: '',
  };


  
  public isNotElder: boolean = false;
  
  showPicker = false;

  setCustomerBirthdate(event: CustomEvent) {
    this.customer.birthDate = format(parseISO(event.detail.value), 'dd/MM/yyyy');
    this.showPicker = false;
  }

  setElderBirthdate(event: CustomEvent) {
    this.customer.elderBirthDate = format(parseISO(event.detail.value), 'dd/MM/yyyy');
    this.showPicker = false;
  }


  applyForm = new FormGroup({});

  submitRegistration() {
    console.log(this.customer);
  }

  constructor() {
  }

  ngOnInit() {}
}
