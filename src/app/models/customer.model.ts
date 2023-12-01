import { Address } from "./Address";

export interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    address: Address;
    phoneNumber: string;

    profilePicture: string;
    elderDescription: string;

    elderFirstName: string;
    elderLastName: string;
    elderBirthDate: string;
    elderAddress: Address;
    elderTelephoneNumber: string;

    isNotElder: boolean;
    


    
}