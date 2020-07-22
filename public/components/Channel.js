import React from "react";

class Channel extends React.Component {
  render() {
    const { name, imgSource, description } = this.props;
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
