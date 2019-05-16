"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageUtils {
    generateMessage(from, text) {
        return { from, text, createdAt: new Date().getTime() };
    }
    generateLocationMessage(from, latitude, longitude) {
        return { from, url: `https://www.google.com/maps?q=${latitude},${longitude}`, createdAt: new Date().getTime() };
    }
}
const messageUtils = new MessageUtils();
exports.default = messageUtils;
