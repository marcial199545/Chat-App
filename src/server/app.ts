import express from "express";
import path from "path";
import morgan from "morgan";
import expHBS from "express-handlebars";
import indexRoutes from "../routes/indexRoutes";
// import socketIO from "socket.io";
// import http from "http";

class Application {
    app: express.Application;
    constructor() {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }
    settings() {
        this.app.set("PORT", process.env.PORT || 4646);
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.engine(
            "hbs",
            expHBS({
                layoutsDir: path.join(this.app.get("views"), "layouts"),
                partialsDir: path.join(this.app.get("views"), "partials"),
                defaultLayout: "main",
                extname: ".hbs"
            })
        );
        this.app.set("view engine", ".hbs");
    }
    middleware() {
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes);
        this.app.use(express.static(path.join(__dirname, "../../public")));
    }
    start() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log(`listening to PORT §§ ${this.app.get("PORT")} §§`);
        });
    }
}
export default Application;
