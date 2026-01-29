import express from "express";
import { Response } from "express";
import { getDiagnoses } from "../services/diagnosis";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
    res.json(getDiagnoses());
})

export default router;