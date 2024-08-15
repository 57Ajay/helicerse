"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiResponse = /** @class */ (function () {
    function ApiResponse(message, data, statuscode) {
        if (message === void 0) { message = "successful"; }
        this.message = message;
        this.data = data;
        this.statuscode = statuscode;
        this.success = statuscode < 400;
    }
    return ApiResponse;
}());
;
exports.default = ApiResponse;
//# sourceMappingURL=apiResponse.js.map