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
        socket.emit("newSentMessage", messageUtils.generateMessage(message.from, message.text));
        socket.broadcast.emit("newRecieveMessage", messageUtils.generateMessage(message.from, message.text));
        callback(message);
    });
    socket.on("createLocationMessage", coords => {
        socket.emit("newSentLocationMessage", messageUtils.generateLocationMessage("User", coords.latitude, coords.longitude));
        socket.broadcast.emit("newRecieveLocationMessage", messageUtils.generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
    socket.on("join", (params, callback) => {
        if (!validationUtils.isRealString(params.name) || !validationUtils.isRealString(params.room)) {
            return callback("please provide the values for Name and Room name");
        }
        socket.join(params.room);
        usersUtils.removeUser(socket.id);
        usersUtils.addUser(params.name, params.room, socket.id);
        io.to(params.room).emit("updateUserList", {
            users: usersUtils.getUsersList(params.room),
            currentUser: { name: params.name, room: params.room, id: socket.id }
        });
        socket.emit("newRecieveMessage", messageUtils.generateMessage("Admin", `Welcome to chat App room ${params.room}`));
        socket.broadcast.to(params.room).emit("newRecieveMessage", messageUtils.generateMessage("Admin", `${params.name} Joined to ${params.room}`));
        callback();
    });
    socket.on("disconnect", () => {
        let user = usersUtils.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("updateUserList", usersUtils.getUsersList(user.room));
            io.to(user.room).emit("newRecieveMessage", messageUtils.generateMessage("Admin", `${user.name} has left the ${user.room} room`));
        }
    });
});
server.listen(expApp.app.get("PORT"), () => {
    console.log(`connected to port ${expApp.app.get("PORT")}`);
});
