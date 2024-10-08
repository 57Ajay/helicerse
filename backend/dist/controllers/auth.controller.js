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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
var user_model_1 = __importDefault(require("../models/user.model"));
var asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
var apiError_1 = __importDefault(require("../utils/apiError"));
var apiResponse_1 = __importDefault(require("../utils/apiResponse"));
var generateAccessAndRefreshToken_1 = __importDefault(require("../utils/generateAccessAndRefreshToken"));
exports.registerUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, _a, email, password, role, user, newUser, newUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                loggedInUser = req.user;
                _a = req.body, email = _a.email, password = _a.password, role = _a.role;
                if (!(loggedInUser.role === "Principal")) return [3 /*break*/, 3];
                if (role === "Principal") {
                    throw new apiError_1.default("You are already a principal", 400);
                }
                ;
                if (!email || !password || !role) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (user) {
                    throw new apiError_1.default("User already exists", 400);
                }
                ;
                newUser = new user_model_1.default({ email: email, password: password, role: role });
                return [4 /*yield*/, newUser.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(201).json(new apiResponse_1.default("User created successfully", {
                        _id: newUser._id,
                        email: email,
                        role: role
                    }, 201))];
            case 3:
                if (!(loggedInUser.role === "Teacher")) return [3 /*break*/, 5];
                if (!email || !password || !role) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                if (role !== "Student") {
                    throw new apiError_1.default("Role must be Student", 400);
                }
                ;
                newUser = new user_model_1.default({ email: email, password: password, role: role });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(201).json(new apiResponse_1.default("User created successfully", {
                        _id: newUser._id,
                        email: email,
                        role: role
                    }, 201))];
            case 5: throw new apiError_1.default("You are not authorized to perform this action", 401);
            case 6:
                ;
                return [2 /*return*/];
        }
    });
}); });
exports.loginUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordMatched, _b, accessToken, refreshToken;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    throw new apiError_1.default("All fields are required", 400);
                }
                ;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new apiError_1.default("User not found", 404);
                }
                ;
                return [4 /*yield*/, user.isPasswordMatched(password)];
            case 2:
                isPasswordMatched = _c.sent();
                if (!isPasswordMatched) {
                    throw new apiError_1.default("Invalid credentials", 401);
                }
                ;
                return [4 /*yield*/, (0, generateAccessAndRefreshToken_1.default)(user._id)];
            case 3:
                _b = _c.sent(), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                return [2 /*return*/, res.status(200).cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    }).cookie("accessToken", accessToken, {
                        httpOnly: true,
                        maxAge: 1 * 60 * 60 * 1000
                    }).json(new apiResponse_1.default("User logged in successfully", {
                        user: {
                            _id: user._id,
                            email: user.email,
                            role: user.role,
                            refreshToken: refreshToken,
                        }
                    }, 200))];
        }
    });
}); });
exports.logoutUser = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userTologout;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) {
                    throw new apiError_1.default("User not found", 404);
                }
                ;
                return [4 /*yield*/, user_model_1.default.findById(user._id)];
            case 1:
                userTologout = _a.sent();
                if (!userTologout) {
                    throw new apiError_1.default("User not found", 404);
                }
                ;
                userTologout.refreshToken = "";
                return [4 /*yield*/, userTologout.save()];
            case 2:
                _a.sent();
                res.clearCookie("refreshToken");
                res.clearCookie("accessToken");
                return [2 /*return*/, res.status(200).json(new apiResponse_1.default("User logged out successfully", {}, 200))];
        }
    });
}); });
//# sourceMappingURL=auth.controller.js.map