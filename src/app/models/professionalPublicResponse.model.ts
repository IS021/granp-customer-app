import { Gender } from "./Gender";
import { Profession } from "./Profession";

export interface Professional {

    profilePicture: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
    gender: Gender;
    email: string;
    phoneNumber: string;

    description: string;

    profession: Profession;
    address: string;
    isVerified: boolean;
    hourlyRate: number;
    longTimeJob: boolean;
    shortTimeJob: boolean;

}

