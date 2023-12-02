import { Address } from "./Address";

export interface Customer {
    firstName: string;
    lastName: string;
    /* email: string; */

    phoneNumber: string;

    profilePicture: string;
    elderDescription: string;

    elderFirstName: string;
    elderLastName: string;
    elderBirthDate: string;
    elderAge: number;
    elderAddress: Address;
    elderTelephoneNumber: string;

    isElder: boolean; 
}
