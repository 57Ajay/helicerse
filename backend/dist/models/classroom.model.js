"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var classroomSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    days: [{ type: String, required: true }],
    teacher: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
});
var Classroom = mongoose_1.default.model('Classroom', classroomSchema);
exports.default = Classroom;
//# sourceMappingURL=classroom.model.js.map