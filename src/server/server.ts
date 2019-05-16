import App from "./app";
import socketIO from "socket.io";
import http from "http";
import messageUtils from "../utils/messageUtils";
const expApp = new App();
const server = http.createServer(expApp.app);
let io = socketIO(server);

io.on("connect", socket => {
    console.log("new User connected");
    socket.emit("newRecieveMessage", messageUtils.generateMessage("Admin", "welcome to chat app"));
    socket.broadcast.emit("newRecieveMessage", messageUtils.generateMessage("Admin", "new user connected"));
    socket.on("createMessage", (message, callback) => {
        socket.emit("newSentMessage", messageUtils.generateMessage(message.from, message.text));
        socket.broadcast.emit("newRecieveMessage", messageUtils.generateMessage(message.from, message.text));
        callback(message);
    });
    socket.on("createLocationMessage", coords => {
        socket.emit("newSentLocationMessage", messageUtils.generateLocationMessage("User", coords.latitude, coords.longitude));
        socket.broadcast.emit("newRecieveLocationMessage", messageUtils.generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
    socket.on("disconnect", () => console.log(`User disconnected`));
});
server.listen(expApp.app.get("PORT"), () => {
    console.log(`connected to port ${expApp.app.get("PORT")}`);
});
