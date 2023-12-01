import { Address } from "./Address";
import { Profession } from "./Profession";

export interface Professional {
    profilePicture: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    phoneNumber: string;

    description: string;
    profession: Profession;
    address: Address;
    age: number;
    isVerified: boolean;

    hourlyRate: number;
    longTimeJoob: boolean;
    shortTimeJob: boolean;

}
