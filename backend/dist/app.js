"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var auth_route_1 = __importDefault(require("./routes/auth/auth.route"));
var classroom_route_1 = __importDefault(require("./routes/classroom/classroom.route"));
var app = (0, express_1.default)();
exports.app = app;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/api", function (req, res) {
    res.send("jibber jabber testing 123");
});
// Auth Router
app.use("/api/auth", auth_route_1.default);
// ClassRoom router
app.use("/api/classroom", classroom_route_1.default);
//# sourceMappingURL=app.js.map