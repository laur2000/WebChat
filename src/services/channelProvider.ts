import Channel from "../models/channel";
class ChannelProvider {
  private channel_id: number;
  private channels: { [channelId: string]: Channel };

  constructor() {
    this.channel_id = 0;
    this.channels = {};
  }

  private nextChannelId() {
    return "ch" + this.channel_id++;
  }

  public addChannel(secret: string, name?: string, description?: string) {
    const channelId = this.nextChannelId();
    return (this.channels[channelId] = new Channel(
      channelId,
      secret,
      name,
      description
    ));
  }

  public getChannel(channelId: string) {
    return this.channels[channelId];
  }

  public getChannels() {
    return this.channels;
  }

  public getChannelSecret(channelId: string) {
    return this.channels[channelId].getSecret();
  }

  public channelExist(channelId: string) {
    return !!this.channels[channelId];
  }

  public removeChannel(channelId: string) {
    if (this.channelExist(channelId)) {
      delete this.channels[channelId];
    }
  }
}

const channelProvider = new ChannelProvider();

export default channelProvider;
