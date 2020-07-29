import Channel from "./channel";

export default class User {
  private id: string;
  private name: string;
  private channels: { [channelId: string]: Channel };
  private writePermission: boolean;

  constructor(id: string, name: string, writePermission: boolean) {
    this.id = id;
    this.name = name;
    this.writePermission = writePermission;
    this.channels = {};
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public setWritePermission(writePermission: boolean) {
    this.writePermission = writePermission;
  }

  public getWritePermission() {
    return this.writePermission;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getChannels() {
    return this.channels;
  }

  public addChannel(channel: Channel) {
    this.channels[channel.getId()] = channel;
  }

  public removeChannel(channel: Channel) {
    if (this.channels[channel.getId()]) {
      delete this.channels[channel.getId()];
    }
  }

  toString() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
    });
  }
}
