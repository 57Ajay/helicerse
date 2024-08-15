import { Router } from "express";
import verifyToken from "../../middlewares/verifyAuth.middleware";
import { createTimetable, updateTimetable, getAllTimetables, getTimetableById } from "../../controllers/timetable.controller";

const timeTableRouter = Router();
timeTableRouter.use(verifyToken);

timeTableRouter.post("/create", createTimetable);
timeTableRouter.patch("/update", updateTimetable);
timeTableRouter.get("/all", getAllTimetables);
timeTableRouter.get("/:timetableId", getTimetableById);


export default timeTableRouter;