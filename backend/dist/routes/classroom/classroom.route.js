"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var principle_controller_1 = require("../../controllers/principle.controller");
var verifyAuth_middleware_1 = __importDefault(require("../../middlewares/verifyAuth.middleware"));
var classRoom = (0, express_1.default)();
classRoom.post("/create", verifyAuth_middleware_1.default, principle_controller_1.createClassroom);
classRoom.post("/assign-student", verifyAuth_middleware_1.default, principle_controller_1.assignStudentToClassroom);
exports.default = classRoom;
//# sourceMappingURL=classroom.route.js.map