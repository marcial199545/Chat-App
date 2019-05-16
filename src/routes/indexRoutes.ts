import { Router, Request, Response } from "express";
import indexController from "../controllers/indexControllers";
const router = Router();
router.route("/").get(indexController.renderIndex);
export default router;
