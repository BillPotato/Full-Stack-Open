import { isDateOfBirth, isGender, isName, isOccupation, isSsn, isString } from "./typeGuards";
import { NewPatient } from "./types";

export const parseName = ( name: unknown ) => {
    if ( !name || !isName(name) ) {
        throw Error("Incorrect/missing name");
    }

    return name;
}

export const parseDateOfBirth = ( dateOfBirth: unknown ) => {
    if ( !dateOfBirth || !isDateOfBirth(dateOfBirth) ) {
        throw Error("Incorrect/missing dateOfBirth");
    }

    return dateOfBirth;
}

export const parseGender = ( gender: unknown ) => {
    if ( !gender || !isString(gender) || !isGender(gender) ) {
        throw Error("Incorrect/missing gender");
    }

    return gender;
}

export const parseOccupation = ( occupation: unknown ) => {
    if ( !occupation || !isOccupation(occupation) ) {
        throw Error("Incorrect/missing occupation");
    }

    return occupation;
}

export const parseSsn = ( ssn: unknown ) => {
    if ( !ssn || !isSsn(ssn) ) {
        throw Error("Incorrect/missing ssn");
    }

    return ssn;
}


export const toNewPatient = ( body: unknown ): NewPatient => {
    if ( !body || typeof(body) !== "object" ) {
        throw Error("Incorrect/Missing body");
    }

    if ("name" in body && "dateOfBirth" in body && "ssn" in body
        && "gender" in body && "occupation" in body) {

        const newPatient: NewPatient = {
            name: parseName(body.name),
            dateOfBirth: parseDateOfBirth(body.dateOfBirth),
            ssn: parseSsn(body.ssn),
            gender: parseGender(body.gender),
            occupation: parseOccupation(body.occupation)
        }

        return newPatient;
    }

    throw Error("Missing fields in body");
}