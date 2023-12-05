import { Place } from "./Place";


export class Availability {
  
    // Properties
    StartHour: string;
    EndHour: string;
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
    Place: Place;
  
    // Constructor
    constructor(StartHour: string, EndHour: string, Monday: boolean, Tuesday: boolean, Wednesday: boolean, Thursay: boolean, Friday: boolean, Saturday: boolean, Sunday: boolean, Place: Place) {
      this.StartHour = StartHour;
      this.EndHour = EndHour;
      this.Monday = Monday;
      this.Tuesday = Tuesday;
      this.Wednesday = Wednesday;
      this.Thursday = Thursay;
      this.Friday = Friday;
      this.Saturday = Saturday;
      this.Sunday = Sunday;
      this.Place = Place;
    }
  }