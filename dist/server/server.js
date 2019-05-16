"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const messageUtils_1 = __importDefault(require("../utils/messageUtils"));
const expApp = new app_1.default();
const server = http_1.default.createServer(expApp.app);
let io = socket_io_1.default(server);
io.on("connect", socket => {
    console.log("new User connected");
    socket.emit("newRecieveMessage", messageUtils_1.default.generateMessage("Admin", "welcome to chat app"));
    socket.broadcast.emit("newRecieveMessage", messageUtils_1.default.generateMessage("Admin", "new user connected"));
    socket.on("createMessage", (message, callback) => {
        socket.emit("newSentMessage", messageUtils_1.default.generateMessage(message.from, message.text));
        socket.broadcast.emit("newRecieveMessage", messageUtils_1.default.generateMessage(message.from, message.text));
        callback(message);
    });
    socket.on("createLocationMessage", coords => {
        socket.emit("newSentLocationMessage", messageUtils_1.default.generateLocationMessage("User", coords.latitude, coords.longitude));
        socket.broadcast.emit("newRecieveLocationMessage", messageUtils_1.default.generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
    socket.on("disconnect", () => console.log(`User disconnected`));
});
server.listen(expApp.app.get("PORT"), () => {
    console.log(`connected to port ${expApp.app.get("PORT")}`);
});
