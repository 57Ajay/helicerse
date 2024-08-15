"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var timetableSchema = new mongoose_1.default.Schema({
    classroom: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Classroom', required: true },
    subject: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    day: { type: String, required: true },
}, {
    timestamps: true,
});
var Timetable = mongoose_1.default.model('Timetable', timetableSchema);
exports.default = Timetable;
//# sourceMappingURL=timetable.model.js.map