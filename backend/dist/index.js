"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var dbConnect_1 = __importDefault(require("./db/dbConnect"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
(0, dbConnect_1.default)().then(function () {
    app_1.app.listen(process.env.PORT || 3000, function () {
        console.log("Server is running on port ".concat(process.env.PORT));
    });
}).catch(function (err) {
    console.log("Database connection Error", err);
});
//# sourceMappingURL=index.js.map