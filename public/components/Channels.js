import React from "react";
import Channel from "./Channel";

class Channels extends React.Component {
  state = {
    channels: [
      {
        name: "C#",
        description: "Chat for C# community",
        imgSource:
          "data:image/png;base64,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",
      },
      {
        name: "JavaScript",
        description: "Chat for JavaScript community",
        imgSource:
          "https://www.alexmedina.net/wp-content/uploads/2019/12/javascript.png",
      },
      {
        name: "Minecraft",
        description: "Chat for minecraft community",
        imgSource:
          "https://i.pinimg.com/originals/96/c8/52/96c852db9c846582c4c6a62cdedaa2fc.png",
      },

      {
        name: "LoL",
        description: "Chat for lol community",
        imgSource:
          "https://vignette.wikia.nocookie.net/leagueoflegendsoficial/images/d/d2/League_of_legends_logo.png/revision/latest/scale-to-width-down/340?cb=20191021173733&path-prefix=es",
      },
      {
        name: "YouTube",
        description: "Chat for YouTube community",
        imgSource:
          "https://cdn.icon-icons.com/icons2/195/PNG/256/YouTube_23392.png",
      },

      {
        name: "NodeJs",
        description: "Chat for NdeJs community",
        imgSource:
          "https://www.tecnoempleo.com/graficos/iconos_rrss/tw_card_nodejs.png?1009",
      },
      {
        name: "CSGO",
        description: "Chat for csgo community",
        imgSource:
          "https://storage.gra.cloud.ovh.net/v1/AUTH_296c7803aa594af69d39b970927c8fb9/media/tournaments_avatars/T0/T0qW0De04mAXvmk4.jpeg",
      },
    ],
  };
  render() {
    const { channels } = this.state;
    return (
      <div id="channel-list" className="card h-100">
        <ul className="list-group flush">
          {channels.map((channel, index) => (
            <div key={index}>
              <li className="list-group-item btn-hover">
                <Channel {...channel} />
              </li>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Channels;
