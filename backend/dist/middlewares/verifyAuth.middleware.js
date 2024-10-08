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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = require("dotenv");
var apiError_1 = __importDefault(require("../utils/apiError"));
var user_model_1 = __importDefault(require("../models/user.model"));
(0, dotenv_1.config)();
var verifyToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, user, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
                if (!token) {
                    throw new apiError_1.default("Unauthorized - No token provided", 401);
                }
                if (!process.env.ACCESS_TOKEN_SECRET) {
                    throw new apiError_1.default("Internal Server Error - Token secret is not defined", 500);
                }
                decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
                return [4 /*yield*/, user_model_1.default.findById(decodedToken._id).select("-password")];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new apiError_1.default("Unauthorized - User not found", 401);
                }
                req.user = {
                    _id: user._id.toString(), // Convert ObjectId to string
                    email: user.email,
                    role: user.role,
                };
                next();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                if (error_1 instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    next(new apiError_1.default("Unauthorized - Invalid token", 401));
                }
                else if (error_1.name === 'TokenExpiredError') {
                    next(new apiError_1.default("Unauthorized - Token expired", 401));
                }
                else if (error_1 instanceof apiError_1.default) {
                    next(error_1);
                }
                else {
                    next(new apiError_1.default("Internal Server Error", 500));
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = verifyToken;
//# sourceMappingURL=verifyAuth.middleware.js.map