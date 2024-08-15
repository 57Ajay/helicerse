import { Router } from "express";
import verifyToken from "../../middlewares/verifyAuth.middleware";
import { createTimetable, updateTimetable } from "../../controllers/timetable.controller";

const timeTableRouter = Router();
timeTableRouter.use(verifyToken);

timeTableRouter.post("/create", createTimetable)
timeTableRouter.patch("/update", updateTimetable)


export default timeTableRouter;