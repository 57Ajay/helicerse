import Router from "express";
import { createClassroom, assignStudentToClassroom, updateClassroom, deleteClassroom } from "../../controllers/classroom.controller";
import verifyToken from "../../middlewares/verifyAuth.middleware";

const classroomRouter = Router();

classroomRouter.post("/create", verifyToken, createClassroom);
classroomRouter.post("/assign-student", verifyToken, assignStudentToClassroom);
classroomRouter.patch("/update", verifyToken, updateClassroom);
classroomRouter.delete("/delete", verifyToken, deleteClassroom);

export default classroomRouter;
