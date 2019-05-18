interface Iusers {
    addUser(name: string, room: string, id: string): { name: string; room: string; id: string };
    removeUser(id: string): void;
    getUser(id: string): { name: string; room: string; id: string };
    getUsersList(room: string): string[];
}
interface IUserObject {
    name: string;
    room: string;
    id: string;
}
class Users implements Iusers {
    users: IUserObject[];
    constructor() {
        this.users = [];
    }
    addUser(name: string, room: string, id: string) {
        let user = { name, room, id };
        this.users.push(user);
        return user;
    }
    removeUser(id: string) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }
        return user;
    }
    getUser(id: string) {
        return this.users.filter(user => user.id === id)[0];
    }
    getUsersList(room: string) {
        let users = this.users.filter(user => user.room === room);
        let namesArray = users.map(user => user.name);
        return namesArray;
    }
}
const usersUtils = new Users();
export default usersUtils;
