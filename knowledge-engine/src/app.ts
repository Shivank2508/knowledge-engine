import express from 'express';
import dotenv from "dotenv"
dotenv.config()
const app = express();
app.use(express.json());
import documentRoutes from "./routes/document.routed"

app.get("/", async (req, res) => {
    res.json({
        message: "knowledge engine is working fine",
        status: "Success"
    })
})
app.use("/api/document", documentRoutes)
export default app;