import { Profession } from "./Profession";

export interface Reservation {
    firstName: string;
    lastName: string;
    profession: Profession;

    isAtHome: boolean;
    date: string;
    startHour: string;
    endHour: string;
}