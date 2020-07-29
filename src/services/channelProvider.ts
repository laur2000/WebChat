import Channel from "../models/channel";
import { db } from "./db";
import { ObjectID } from "mongodb";
const sanitize = require("mongo-sanitize");
class ChannelProvider {
  private collection: string = "channels";

  public async addChannel(data: { [key: string]: any }) {
    if (!data.secret) {
      return null;
    }
    data = sanitize(data);
    return (await db.collection(this.collection).insertOne(data)).ops[0];
  }

  public async getChannel(channelId: string) {
    if (!ObjectID.isValid(channelId)) {
      return null;
    }
    return await db
      .collection(this.collection)
      .findOne(new ObjectID(channelId), { projection: { secret: 0 } });
  }
  public async updateChannel(channelId: string, data: any) {
    if (!ObjectID.isValid(channelId)) {
      return null;
    }
    data = sanitize(data);
    return (
      await db
        .collection(this.collection)
        .findOneAndUpdate(
          { _id: new ObjectID(channelId) },
          { $set: data },
          { returnOriginal: false, projection: { secret: 0 } }
        )
    ).value;
  }

  public async getChannelSecret(channelId: string) {
    if (!ObjectID.isValid(channelId)) {
      return null;
    }
    const channel = await db
      .collection(this.collection)
      .findOne(new ObjectID(channelId), { projection: { secret: 1 } });
    return channel && channel.secret;
  }

  public channelExist(channelId: string) {
    return true;
  }

  public async removeChannel(channelId: string) {
    return (
      await db
        .collection(this.collection)
        .findOneAndDelete({ _id: new ObjectID(channelId) })
    ).value;
  }
}

const channelProvider = new ChannelProvider();

export default channelProvider;
