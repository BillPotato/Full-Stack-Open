import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

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

app.post("/exercises", (req, res) => {
    if (!req.body) return res.status(400).json({ error: "missing body" });

    const { daily_exercises, target } = req.body;

    if (daily_exercises === undefined || target === undefined ||
      !Array.isArray(daily_exercises) || daily_exercises.length === 0 || !daily_exercises.every(val => typeof(val) == "number") 
        || typeof(target) !== "number") return res.status(400).json({ error: "malformatted parameters" });

    const result = calculateExercises(daily_exercises, target);

   return res.json(result);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})