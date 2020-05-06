import User from './user';

export default class Channel {

    private id: string;
    private secret: string;
    private name: string;
    private users: { [userId: string]: User };

    constructor(id: string, secret: string, name?: string) {
        this.id = id;
        this.secret = secret;
        this.name = name ? name : id;
        this.users = {};
    }

    public getId() {
        return this.id;
    }

    public getSecret() {
        return this.secret;
    }

    public getName() {
        return this.name;
    }

    public getUsers() {
        return this.users;
    }

    public addUser(user: User) {
        this.users[user.getId()] = user;
    }

    public removeUser(user: User) {
        if (this.users[user.getId()]) {
            delete this.users[user.getId()];
        }
    }

    toJson() {
        const users = [];

        for (let userId in this.users) {
            const user = this.users[userId];
            users.push({
                id: user.getId(),
                name: user.getName()
            });
        }
        return {
            name: this.getName(),
            users: users
        }
    }

}