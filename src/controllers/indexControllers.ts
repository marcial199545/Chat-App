import { Request, Response } from "express";
class IndexController {
    public renderIndex(req: Request, res: Response) {
        res.render("index", { title: "Welcome to books app" });
    }
}
const indexController = new IndexController();
export default indexController;
