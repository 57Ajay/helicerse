"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verifyAuth_middleware_1 = __importDefault(require("../../middlewares/verifyAuth.middleware"));
var teacher_controller_1 = require("../../controllers/teacher.controller");
var timeTableRouter = (0, express_1.Router)();
timeTableRouter.use(verifyAuth_middleware_1.default);
timeTableRouter.post("/create", teacher_controller_1.createTimetable);
timeTableRouter.patch("/update", teacher_controller_1.updateTimetable);
exports.default = timeTableRouter;
//# sourceMappingURL=timetable.route.js.map