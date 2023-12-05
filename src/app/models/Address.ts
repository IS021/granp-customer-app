import { GeoLocation } from './GeoLocation';

export class Address {
    // Properties
    Street: string;
    StreetNumber: string;
    City: string;
    ZipCode: string;

    Location: GeoLocation;

    // Constructor
    constructor() {
        this.Street = '';
        this.StreetNumber = '';
        this.City = '';
        this.ZipCode = '';
        this.Location = new GeoLocation(0,0);
    }

    getFullAddress(): string {
        return `${this.Street}, ${this.StreetNumber}, ${this.City}, ${this.ZipCode}`;
    }

    setFullAddress(fullAddress: string) {
        const addressArray = fullAddress.split(', ');
        this.Street = addressArray[0];
        this.StreetNumber = addressArray[1];
        this.City = addressArray[2];
        this.ZipCode = addressArray[3];
    }
}
