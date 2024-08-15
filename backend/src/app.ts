import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth/auth.route";
import classRoom from "./routes/classroom/classroom.route";
const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get("/api", (req, res)=>{
    res.send("jibber jabber testing 123")
});

// Auth Router
app.use("/api/auth", authRouter);

// ClassRoom router
app.use("/api/classroom", classRoom);

export { app };

