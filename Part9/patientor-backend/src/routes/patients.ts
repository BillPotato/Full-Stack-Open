import express from "express";
import { Response } from "express";
import { getPatientsWithoutSsn } from "../services/patients";
import { PatientWithoutSsn } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSsn[]>) => {
    res.json(getPatientsWithoutSsn());
})

export default router;