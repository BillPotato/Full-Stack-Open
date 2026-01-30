import data from "../data/patients";
import { NewPatient, Patient, PatientWithoutSsn } from "../types";
// import { v1 as uuid } from 'uuid';

const patientData = data;

export const getPatients = (): Patient[]  => {
    return patientData;
}

export const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export const addPatient = ( patient: NewPatient ) => {
    const newPatient = {
        // id: uuid(),
        id: "1",
        ...patient
    }

    patientData.push(newPatient)

    return newPatient;
}