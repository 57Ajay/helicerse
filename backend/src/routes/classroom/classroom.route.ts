import Router from "express";
import { createClassroom, assignStudentToClassroom } from "../../controllers/principle.controller";
import verifyToken from "../../middlewares/verifyAuth.middleware";

const classRoom = Router();

classRoom.post("/create", verifyToken, createClassroom);
classRoom.post("/assign-student", verifyToken, assignStudentToClassroom);

export default classRoom;