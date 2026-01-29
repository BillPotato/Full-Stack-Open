import express from "express"

const app = express();

app.get("/ping", (_req, res) => {
    res.send("pong");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})