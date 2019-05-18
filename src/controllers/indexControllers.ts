import { Request, Response } from "express";
class IndexController {
    public renderIndex(req: Request, res: Response) {
        res.render("index", { title: "Chat App" });
    }
    public renderChatRoom(req: Request, res: Response) {
        res.render("chat", { title: "Chat Room" });
    }
}
const indexController = new IndexController();
export default indexController;
