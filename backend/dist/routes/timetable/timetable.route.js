"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verifyAuth_middleware_1 = __importDefault(require("../../middlewares/verifyAuth.middleware"));
var timetable_controller_1 = require("../../controllers/timetable.controller");
var timeTableRouter = (0, express_1.Router)();
timeTableRouter.use(verifyAuth_middleware_1.default);
timeTableRouter.post("/create", timetable_controller_1.createTimetable);
timeTableRouter.patch("/update", timetable_controller_1.updateTimetable);
timeTableRouter.get("/all", timetable_controller_1.getAllTimetables);
timeTableRouter.get("/:timetableId", timetable_controller_1.getTimetableById);
exports.default = timeTableRouter;
//# sourceMappingURL=timetable.route.js.map