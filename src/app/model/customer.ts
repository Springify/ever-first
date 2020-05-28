import { Dependent } from './dependent';
import { PensionMember } from './pension-member';
import { Address } from './address';
export class Customer {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    birthDate: Date;
    contactNumber: number;
    otherContactNumber: number;
    pensionSource: string;
    pensionType: string;

    presentAddress: Address;
    permanentAddress: Address;
    previousAddress: Address;

    pensionMember: PensionMember;

    dependents: Dependent[];
}
