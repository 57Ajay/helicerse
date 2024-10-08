"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var classroom_controller_1 = require("../../controllers/classroom.controller");
var verifyAuth_middleware_1 = __importDefault(require("../../middlewares/verifyAuth.middleware"));
var classroomRouter = (0, express_1.default)();
classroomRouter.post("/create", verifyAuth_middleware_1.default, classroom_controller_1.createClassroom);
classroomRouter.post("/assign-student", verifyAuth_middleware_1.default, classroom_controller_1.assignStudentToClassroom);
classroomRouter.patch("/update", verifyAuth_middleware_1.default, classroom_controller_1.updateClassroom);
classroomRouter.delete("/delete", verifyAuth_middleware_1.default, classroom_controller_1.deleteClassroom);
classroomRouter.get("/all", verifyAuth_middleware_1.default, classroom_controller_1.getAllClassrooms);
classroomRouter.get("/:classroomId", verifyAuth_middleware_1.default, classroom_controller_1.getClassroomById);
exports.default = classroomRouter;
//# sourceMappingURL=classroom.route.js.map