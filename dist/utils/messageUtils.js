"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class MessageUtils {
    generateMessage(from, text) {
        return { from, text, createdAt: moment_1.default().valueOf() };
    }
    generateLocationMessage(from, latitude, longitude) {
        return { from, url: `https://www.google.com/maps?q=${latitude},${longitude}`, createdAt: moment_1.default().valueOf() };
    }
}
const messageUtils = new MessageUtils();
exports.default = messageUtils;
