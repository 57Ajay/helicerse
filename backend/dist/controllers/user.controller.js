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
exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.updateUser = void 0;
var asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
var apiError_1 = __importDefault(require("../utils/apiError"));
var apiResponse_1 = __importDefault(require("../utils/apiResponse"));
var user_model_1 = __importDefault(require("../models/user.model"));
var bcrypt_1 = __importDefault(require("bcrypt"));
exports.updateUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, _a, userId, email, password, hashedPassword, updateData, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                _a = req.body, userId = _a.userId, email = _a.email, password = _a.password;
                if (!userId) {
                    throw new apiError_1.default("userId is required", 400);
                }
                if (!email && !password) {
                    throw new apiError_1.default("email or password, any one is required", 400);
                }
                hashedPassword = void 0;
                if (!password) return [3 /*break*/, 2];
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                _b.label = 2;
            case 2:
                updateData = { email: email };
                if (hashedPassword) {
                    updateData.password = hashedPassword;
                }
                return [4 /*yield*/, user_model_1.default.findByIdAndUpdate(userId, updateData, { new: true })];
            case 3:
                user = _b.sent();
                if (!user) {
                    throw new apiError_1.default("User not found", 404);
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("User updated successfully", {
                        email: user.email,
                        role: user.role,
                        _id: user._id
                    }, 200))];
            case 4:
                error_1 = _b.sent();
                console.log(error_1.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.deleteUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, userId, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                userId = req.body.userId;
                if (!userId) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                return [4 /*yield*/, user_model_1.default.findByIdAndDelete(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new apiError_1.default("User not found", 404);
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("User deleted successfully", null, 200))];
            case 2:
                error_2 = _a.sent();
                console.log(error_2.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 3:
                ;
                return [2 /*return*/];
        }
    });
}); });
exports.getAllUsers = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, allUsers, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal") {
                    throw new apiError_1.default("You are not authorized to perform this action", 403);
                }
                return [4 /*yield*/, user_model_1.default.find({
                        role: { $in: ["Teacher", "Student"] }
                    }).select('-password -refreshToken')];
            case 1:
                allUsers = _a.sent();
                if (!allUsers.length) {
                    return [2 /*return*/, res.status(200).json(new apiResponse_1.default("No users found", [], 200))];
                }
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("Users fetched successfully", allUsers, 200))];
            case 2:
                error_3 = _a.sent();
                console.log(error_3.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.getUserById = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, userId, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                loggedInUser = req.user;
                if (loggedInUser.role !== "Principal") {
                    throw new apiError_1.default("You are not authorized to perform this action", 404);
                }
                ;
                userId = req.params.userId;
                if (!userId) {
                    throw new apiError_1.default("userId is required", 400);
                }
                ;
                return [4 /*yield*/, user_model_1.default.findById(userId).select("-password -refreshToken")];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("User fetched successfully", {
                        user: user
                    }, 200))];
            case 2:
                error_4 = _a.sent();
                console.log(error_4.message);
                throw new apiError_1.default("Something went wrong", 500);
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=user.controller.js.map