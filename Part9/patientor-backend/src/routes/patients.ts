import express from "express";
import { Response } from "express";
import { addPatient, getPatientsWithoutSsn } from "../services/patients";
import { PatientWithoutSsn } from "../types";
import { toNewPatient } from "../utils";

const router = express.Router();
router.use(express.json());

router.get("/", (_req, res: Response<PatientWithoutSsn[]>) => {
    res.json(getPatientsWithoutSsn());
})

router.post("/", (req, res) => {
    const newPatient = toNewPatient(req.body);

    const addedPatient = addPatient(newPatient);

    res.json(addedPatient);
})

export default router;