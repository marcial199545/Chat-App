import App from "./app";
import socketIO from "socket.io";
import http from "http";
import messageUtils from "../utils/messageUtils";
import validationUtils from "../utils/validationUtils";
import usersUtils from "../utils/usersUtils";
const expApp = new App();
const server = http.createServer(expApp.app);

let io = socketIO(server);
io.on("connect", socket => {
    console.log("new User connected");

    socket.on("createMessage", (message, callback) => {
        let user = usersUtils.getUser(socket.id);
        if (user && validationUtils.isRealString(message.text)) {
            socket.emit("newSentMessage", messageUtils.generateMessage(user.name, message.text));
            socket.broadcast.to(user.room).emit("newRecieveMessage", messageUtils.generateMessage(user.name, message.text));
        }
        callback(message);
    });
    socket.on("createLocationMessage", coords => {
        let user = usersUtils.getUser(socket.id);
        if (user) {
            socket.emit("newSentLocationMessage", messageUtils.generateLocationMessage(user.name, coords.latitude, coords.longitude));
            socket.broadcast
                .to(user.room)
                .emit("newRecieveLocationMessage", messageUtils.generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
    socket.on("join", (params, callback) => {
        if (!validationUtils.isRealString(params.name) || !validationUtils.isRealString(params.room)) {
            return callback("please provide the values for Name and Room name");
        }
        socket.join(params.room);
        usersUtils.removeUser(socket.id);
        usersUtils.addUser(params.name, params.room, socket.id);
        io.to(params.room).emit("updateUserList", usersUtils.getUsersList(params.room));
        socket.emit("updateCurrentUser", {
            name: params.name,
            room: params.room,
            id: socket.id
        });
        socket.emit("newRecieveMessage", messageUtils.generateMessage("Admin", `Welcome to chat App room ${params.room}`));
        socket.broadcast
            .to(params.room)
            .emit("newRecieveMessage", messageUtils.generateMessage("Admin", `${params.name} Joined to Room: ${params.room}`));
        callback();
    });
    socket.on("disconnect", () => {
        let user = usersUtils.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("newRecieveMessage", messageUtils.generateMessage("Admin", `${user.name} has left the room ${user.room}`));
            io.to(user.room).emit("updateUserList", usersUtils.getUsersList(user.room));
        }
    });
});
server.listen(expApp.app.get("PORT"), () => {
    console.log(`connected to port ${expApp.app.get("PORT")}`);
});
