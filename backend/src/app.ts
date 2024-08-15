import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth/auth.route";
import classroomRouter from "./routes/classroom/classroom.route";
import userRouter from "./routes/user/user.route";
import timetableRouter from "./routes/timetable/timetable.route";

const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get("/api", (req, res)=>{
    res.send("jibber jabber testing 123")
});

// Auth Router
app.use("/api/auth", authRouter);

// ClassRoom router
app.use("/api/classroom", classroomRouter);

// User router
app.use("/api/user", userRouter);

// TimeTable router

app.use("/api/timetable", timetableRouter);

export { app };

