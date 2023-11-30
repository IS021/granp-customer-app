import { GeoLocation } from './Location';

export class Address {
  // Properties
  Street: string;
  StreetNumber: string;
  City: string;
  ZipCode: string;

  Location?: GeoLocation;

  // Constructor
  constructor(
    Street: string,
    StreetNumber: string,
    City: string,
    ZipCode: string,
    Location: GeoLocation
  ) {
    this.Street = Street;
    this.StreetNumber = StreetNumber;
    this.City = City;
    this.ZipCode = ZipCode;

    this.Location = Location;
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
