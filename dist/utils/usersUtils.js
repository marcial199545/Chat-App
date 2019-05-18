"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Users {
    constructor() {
        this.users = [];
    }
    addUser(name, room, id) {
        let user = { name, room, id };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }
        return user;
    }
    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }
    getUsersList(room) {
        let users = this.users.filter(user => user.room === room);
        let namesArray = users.map(user => user.name);
        return namesArray;
    }
}
const usersUtils = new Users();
exports.default = usersUtils;
