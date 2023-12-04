import { Gender } from "./Gender";

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

    profession: string;
    address: string;
    isVerified: boolean;
    hourlyRate: number;
    longTimeJob: boolean;
    shortTimeJob: boolean;

}

