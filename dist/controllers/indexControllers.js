"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    renderIndex(req, res) {
        res.render("index", { title: "Welcome to books app" });
    }
}
const indexController = new IndexController();
exports.default = indexController;
