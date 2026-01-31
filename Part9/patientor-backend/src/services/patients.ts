import data from "../data/patients";
import { NewPatient, Patient, PatientWithoutSsn } from "../types";
import crypto from "crypto";

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
        id: crypto.randomUUID(),
        ...patient
    }

    patientData.push(newPatient)

    return newPatient;
}