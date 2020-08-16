import { db } from "./db";
const sanitize = require("mongo-sanitize");

class UserProvider {
  private collection = "users";
  insertUser(user: any) {
    const data = sanitize(user);
    return db
      .collection(this.collection)
      .updateOne(
        { email: data.email },
        { $setOnInsert: data },
        { upsert: true }
      );
  }

  updateUser(user: any) {
    const data = sanitize(user);
    return db
      .collection(this.collection)
      .findOneAndUpdate(
        { email: data.email },
        { $set: data },
        { returnOriginal: false }
      );
  }
}
const userProvider = new UserProvider();
export default userProvider;
