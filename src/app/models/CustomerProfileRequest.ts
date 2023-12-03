import { Address } from "./Address";


export class CustomerProfileRequest {
    isElder: boolean;

    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profilePicture: string;

    elderFirstName: string;
    elderLastName: string;
    elderAddress: Address;
    elderBirthDate: string;
    elderPhoneNumber: string;
    elderDescription: string;

    constructor() {
        this.isElder = true;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.profilePicture = '';
        this.elderFirstName = '';
        this.elderLastName = '';
        this.elderAddress = new Address();
        this.elderBirthDate = '';
        this.elderPhoneNumber = '';
        this.elderDescription = '';
    }
}
