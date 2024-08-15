"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var asyncHandler = function (fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(function (err) { return next(err); });
    };
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map