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
}
