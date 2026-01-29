import data from "../data/patients";
import { Patient, PatientWithoutSsn } from "../types";

export const getPatients = (): Patient[]  => {
    return data;
}

export const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}