import diagnosesRouter from "./routes/diagnoses";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use("/api/diagnoses", diagnosesRouter);

app.get("/api/ping", (_req, res) => {
    res.send("pong");
})



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})