"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimetableById = exports.getAllTimetables = exports.updateTimetable = exports.createTimetable = void 0;
var timetable_model_1 = __importDefault(require("../models/timetable.model"));
var classroom_model_1 = __importDefault(require("../models/classroom.model"));
var asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
var apiError_1 = __importDefault(require("../utils/apiError"));
var apiResponse_1 = __importDefault(require("../utils/apiResponse"));
exports.createTimetable = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, _a, classroomId, subject, startTime, endTime, day, classroom, timetable, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal" && loggedInUser.role !== "Teacher") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                _a = req.body, classroomId = _a.classroomId, subject = _a.subject, startTime = _a.startTime, endTime = _a.endTime, day = _a.day;
                if (!classroomId || !subject || !startTime || !endTime || !day) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                return [4 /*yield*/, classroom_model_1.default.findById(classroomId)];
            case 1:
                classroom = _b.sent();
                if (!classroom) {
                    throw new apiError_1.default("Classroom not found", 404);
                }
                ;
                return [4 /*yield*/, timetable_model_1.default.create({
                        classroom: classroomId,
                        subject: subject,
                        startTime: startTime,
                        endTime: endTime,
                        day: day
                    })];
            case 2:
                timetable = _b.sent();
                return [2 /*return*/, res.status(201).json(new apiResponse_1.default("Timetable created successfully", {
                        _id: timetable._id,
                        classroom: timetable.classroom,
                        subject: timetable.subject,
                        startTime: timetable.startTime,
                        endTime: timetable.endTime,
                        day: timetable.day
                    }, 201))];
            case 3:
                error_1 = _b.sent();
                console.log(error_1.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.updateTimetable = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, _a, timetableId, classroomId, subject, startTime, endTime, day, timetable, classroom;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal" && loggedInUser.role !== "Teacher") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                _a = req.body, timetableId = _a.timetableId, classroomId = _a.classroomId, subject = _a.subject, startTime = _a.startTime, endTime = _a.endTime, day = _a.day;
                if (!timetableId) {
                    throw new apiError_1.default("timetableId is required", 400);
                }
                if (!classroomId || !subject || !startTime || !endTime || !day) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                return [4 /*yield*/, timetable_model_1.default.findById(timetableId)];
            case 1:
                timetable = _b.sent();
                if (!timetable) {
                    throw new apiError_1.default("Timetable not found", 404);
                }
                return [4 /*yield*/, classroom_model_1.default.findById(classroomId)];
            case 2:
                classroom = _b.sent();
                if (!classroom) {
                    throw new apiError_1.default("Classroom not found", 404);
                }
                ;
                timetable.classroom = classroomId;
                timetable.subject = subject;
                timetable.startTime = startTime;
                timetable.endTime = endTime;
                timetable.day = day;
                return [4 /*yield*/, timetable.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("Timetable updated successfully", {
                        _id: timetable._id,
                        classroom: timetable.classroom,
                        subject: timetable.subject,
                        startTime: timetable.startTime,
                        endTime: timetable.endTime,
                        day: timetable.day
                    }, 200))];
        }
    });
}); });
exports.getAllTimetables = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, timetables, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal" && loggedInUser.role !== "Teacher") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                return [4 /*yield*/, timetable_model_1.default.find().populate({
                        path: 'classroom',
                        select: 'name _id'
                    })];
            case 1:
                timetables = _a.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("Timetables fetched successfully", {
                        timetables: timetables
                    }, 200))];
            case 2:
                error_2 = _a.sent();
                console.log(error_2.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.getTimetableById = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, timetableId, timetable, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal" && loggedInUser.role !== "Teacher") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                timetableId = req.params.timetableId;
                if (!timetableId) {
                    throw new apiError_1.default("timetableId is required", 400);
                }
                ;
                return [4 /*yield*/, timetable_model_1.default.findById(timetableId).populate({
                        path: 'classroom',
                        select: 'name _id'
                    })];
            case 1:
                timetable = _a.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("Timetable fetched successfully", {
                        timetable: timetable
                    }, 200))];
            case 2:
                error_3 = _a.sent();
                console.log(error_3.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=timetable.controller.js.map