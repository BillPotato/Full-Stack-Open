import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
    return res.send("Hello Full Stack!");
})

app.get("/bmi", (_req, res) => {
    const { height, weight } = _req.query;
    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (isNaN(heightNumber) || isNaN(weightNumber)) return res.status(400).json({ error: "malformatted parameters" });

    const bmi = calculateBmi(heightNumber, weightNumber)

    return res.json({
        height,
        weight,
        bmi
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})