"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationUtils {
    isRealString(str) {
        console.log(typeof str === "string" && str.trim().length > 0);
        return typeof str === "string" && str.trim().length > 0;
    }
}
const validationUtils = new ValidationUtils();
exports.default = validationUtils;
