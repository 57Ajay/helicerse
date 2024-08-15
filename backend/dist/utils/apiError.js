"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(message, statuscode, errors, stack) {
        if (message === void 0) { message = "something went wrong"; }
        if (errors === void 0) { errors = []; }
        if (stack === void 0) { stack = ""; }
        var _this = _super.call(this, message) || this;
        _this.statuscode = statuscode;
        _this.errors = errors;
        _this.data = null;
        _this.message = message;
        _this.success = false;
        if (stack) {
            _this.stack = stack;
        }
        else {
            Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
    }
    return ApiError;
}(Error));
;
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map