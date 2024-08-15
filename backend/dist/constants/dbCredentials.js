"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbName = exports.dbURL = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.dbURL = process.env.MONGODB_URL;
exports.dbName = "heliverse";
//# sourceMappingURL=dbCredentials.js.map