"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const messageUtils_1 = __importDefault(require("../utils/messageUtils"));
const validationUtils_1 = __importDefault(require("../utils/validationUtils"));
const usersUtils_1 = __importDefault(require("../utils/usersUtils"));
const expApp = new app_1.default();
const server = http_1.default.createServer(expApp.app);
let io = socket_io_1.default(server);
io.on("connect", socket => {
    console.log("new User connected");
    socket.on("createMessage", (message, callback) => {
        socket.emit("newSentMessage", messageUtils_1.default.generateMessage(message.from, message.text));
        socket.broadcast.emit("newRecieveMessage", messageUtils_1.default.generateMessage(message.from, message.text));
        callback(message);
    });
    socket.on("createLocationMessage", coords => {
        socket.emit("newSentLocationMessage", messageUtils_1.default.generateLocationMessage("User", coords.latitude, coords.longitude));
        socket.broadcast.emit("newRecieveLocationMessage", messageUtils_1.default.generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });
    socket.on("join", (params, callback) => {
        if (!validationUtils_1.default.isRealString(params.name) || !validationUtils_1.default.isRealString(params.room)) {
            return callback("please provide the values for Name and Room name");
        }
        socket.join(params.room);
        usersUtils_1.default.removeUser(socket.id);
        usersUtils_1.default.addUser(params.name, params.room, socket.id);
        io.to(params.room).emit("updateUserList", {
            users: usersUtils_1.default.getUsersList(params.room),
            currentUser: { name: params.name, room: params.room, id: socket.id }
        });
        socket.emit("newRecieveMessage", messageUtils_1.default.generateMessage("Admin", `Welcome to chat App room ${params.room}`));
        socket.broadcast.to(params.room).emit("newRecieveMessage", messageUtils_1.default.generateMessage("Admin", `${params.name} Joined to ${params.room}`));
        callback();
    });
    socket.on("disconnect", () => {
        let user = usersUtils_1.default.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("updateUserList", usersUtils_1.default.getUsersList(user.room));
            io.to(user.room).emit("newRecieveMessage", messageUtils_1.default.generateMessage("Admin", `${user.name} has left the ${user.room} room`));
        }
    });
});
server.listen(expApp.app.get("PORT"), () => {
    console.log(`connected to port ${expApp.app.get("PORT")}`);
});
