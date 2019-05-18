"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    renderIndex(req, res) {
        res.render("index", { title: "Chat App" });
    }
    renderChatRoom(req, res) {
        res.render("chat", { title: "Chat Room" });
    }
}
const indexController = new IndexController();
exports.default = indexController;
