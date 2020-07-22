import User from "./user";

export default class Channel {
  private id: string;
  private secret: string;
  private name: string;
  private description: string;
  private users: { [userId: string]: User };

  constructor(id: string, secret: string, name?: string, description?: string) {
    this.id = id;
    this.secret = secret;
    this.name = name ? name : id;
    this.description = description ? description : "";
    this.users = {};
  }

  public getId() {
    return this.id;
  }

  public getSecret() {
    return this.secret;
  }

  public setSecret(secret: string) {
    this.secret = secret;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getDescription() {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getUsers() {
    return this.users;
  }

  public getUsersArray() {
    const usersArray = [];
    for (let userId in this.users) {
      const user = this.users[userId];
      usersArray.push({
        id: user.getId(),
        name: user.getName(),
      });
    }
    return usersArray;
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
        name: user.getName(),
      });
    }
    return {
      name: this.getName(),
      description: this.getDescription(),
      users: users,
    };
  }
}
