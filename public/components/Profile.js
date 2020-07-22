import React from "react";

class Profile extends React.Component {
  render() {
    const { name, imgSource } = this.props;
    return (
      <div className="card">
        <img
          className="card-img-top img-round mx-auto"
          src={imgSource}
          alt="User profile"
        />
        <div className="card-body">
          <div className="card-title">{name}</div>
          <a href="/" className="card-link btn btn-outline-secondary">
            Config
          </a>
        </div>
      </div>
    );
  }
}

export default Profile;
