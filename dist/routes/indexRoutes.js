"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = __importDefault(require("../controllers/indexControllers"));
const router = express_1.Router();
router.route("/").get(indexControllers_1.default.renderIndex);
exports.default = router;
