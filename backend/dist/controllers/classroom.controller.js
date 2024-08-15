"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteClassroom = exports.updateClassroom = exports.assignStudentToClassroom = exports.createClassroom = void 0;
var classroom_model_1 = __importDefault(require("../models/classroom.model"));
var asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
var apiError_1 = __importDefault(require("../utils/apiError"));
var apiResponse_1 = __importDefault(require("../utils/apiResponse"));
var user_model_1 = __importDefault(require("../models/user.model"));
exports.createClassroom = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, _a, name_1, startTime, endTime, days, teacherId, teacher, classroom, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                loggedInUser = req.user;
                _a = req.body, name_1 = _a.name, startTime = _a.startTime, endTime = _a.endTime, days = _a.days, teacherId = _a.teacherId;
                if (!name_1 || !startTime || !endTime || !days || !teacherId) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                if (loggedInUser.role !== "Principal") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                return [4 /*yield*/, user_model_1.default.findById(teacherId)];
            case 1:
                teacher = _b.sent();
                if (!teacher || teacher.role !== "Teacher") {
                    throw new apiError_1.default("Teacher not found", 404);
                }
                ;
                return [4 /*yield*/, classroom_model_1.default.create({
                        name: name_1,
                        startTime: startTime,
                        endTime: endTime,
                        days: days,
                        teacher: teacherId,
                    })];
            case 2:
                classroom = _b.sent();
                return [2 /*return*/, res.status(201).json(new apiResponse_1.default("Classroom created successfully", {
                        classroom: classroom
                    }, 201))];
            case 3:
                error_1 = _b.sent();
                console.log(error_1.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); });
exports.assignStudentToClassroom = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, _a, classroomId, studentId_1, classRoom, student, duplicateStudent, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                _a = req.body, classroomId = _a.classroomId, studentId_1 = _a.studentId;
                if (!classroomId || !studentId_1) {
                    throw new apiError_1.default("classId and studentId is required", 404);
                }
                ;
                return [4 /*yield*/, classroom_model_1.default.findById(classroomId)];
            case 1:
                classRoom = _b.sent();
                if (!classRoom) {
                    throw new apiError_1.default("Classroom not found", 404);
                }
                ;
                return [4 /*yield*/, user_model_1.default.findById(studentId_1)];
            case 2:
                student = _b.sent();
                if (!student || student.role !== "Student") {
                    throw new apiError_1.default("Student not found", 404);
                }
                ;
                duplicateStudent = classRoom.students.find(function (student) { return student.toString() === studentId_1; });
                if (duplicateStudent) {
                    throw new apiError_1.default("Student already assigned to classroom", 400);
                }
                ;
                classRoom.students.push(studentId_1);
                return [4 /*yield*/, classRoom.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(201).json(new apiResponse_1.default("Student assigned to classroom successfully", {
                        classRoom: classRoom
                    }, 201))];
            case 4:
                error_2 = _b.sent();
                console.log(error_2.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.updateClassroom = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, classroomId, classroom, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                classroomId = req.body.classroomId;
                if (!classroomId) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                return [4 /*yield*/, classroom_model_1.default.findByIdAndUpdate(classroomId, __assign({}, req.body), { new: true })];
            case 1:
                classroom = _a.sent();
                if (!classroom) {
                    throw new apiError_1.default("Classroom not found", 404);
                }
                ;
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("Classroom updated successfully", {
                        _id: classroom._id,
                        name: classroom.name,
                        startTime: classroom.startTime,
                        endTime: classroom.endTime,
                        days: classroom.days,
                        teacher: classroom.teacher,
                        students: classroom.students
                    }, 200))];
            case 2:
                error_3 = _a.sent();
                console.log(error_3.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.deleteClassroom = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, classroomId, classroom, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                classroomId = req.body.classroomId;
                if (!classroomId) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                return [4 /*yield*/, classroom_model_1.default.findByIdAndDelete(classroomId)];
            case 1:
                classroom = _a.sent();
                if (!classroom) {
                    throw new apiError_1.default("Classroom not found", 404);
                }
                ;
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("Classroom deleted successfully", null, 200))];
            case 2:
                error_4 = _a.sent();
                console.log(error_4.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 3:
                ;
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=classroom.controller.js.map