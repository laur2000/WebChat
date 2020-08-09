import React from "react";

class Channel extends React.Component {
  messageReadImage = "https://i.imgur.com/lfVN8cP.png";
  messageNotReadImage = "https://i.imgur.com/sg0gUTG.png";
  messageWrittingImage = "https://i.imgur.com/KtU5f54.png";
  defaultChannelImage = "https://img.icons8.com/cotton/2x/chat.png";

  render() {
    let { name, imgSource, description } = this.props;
    if (!imgSource) {
      imgSource = this.defaultChannelImage;
    }
    return (
      <div
        className="d-flex align-items-center"
        data-toggle="tootlip"
        data-placement="right"
        title={description}
      >
        <img className="img-round" src={imgSource} alt="Channel" />
        <h4 className="m-0 ml-1">{name}</h4>
      </div>
    );
  }
}

export default Channel;
