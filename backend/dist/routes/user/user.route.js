"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verifyAuth_middleware_1 = __importDefault(require("../../middlewares/verifyAuth.middleware"));
var principle_controller_1 = require("../../controllers/principle.controller");
var userRouter = (0, express_1.Router)();
userRouter.patch("/update", verifyAuth_middleware_1.default, principle_controller_1.updateUser);
userRouter.delete("/delete", verifyAuth_middleware_1.default, principle_controller_1.deleteUser);
userRouter.get("/all", verifyAuth_middleware_1.default, principle_controller_1.getAllUsers);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map