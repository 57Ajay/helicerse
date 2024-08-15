"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../../controllers/auth.controller");
var verifyAuth_middleware_1 = __importDefault(require("../../middlewares/verifyAuth.middleware"));
var authRouter = (0, express_1.Router)();
authRouter.post("/register", verifyAuth_middleware_1.default, auth_controller_1.registerUser);
authRouter.post("/login", auth_controller_1.loginUser);
authRouter.post("/logout", verifyAuth_middleware_1.default, auth_controller_1.logoutUser);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map