import React from "react";
import { userContext } from "../contexts/UserContext";
import { withAuth0 } from "@auth0/auth0-react";
import { navigate } from "@reach/router";
import Loading from "../components/Loading";

class HandleLogin extends React.Component {
  static contextType = userContext;
  state = {
    userLoaded: false,
  };
  shouldComponentUpdate(nextProps, nextState) {
    const { isLoading, isAuthenticated } = nextProps.auth0;

    return !isLoading && isAuthenticated && !nextState.userLoaded;
  }
  getUserMetadata() {
    const {
      user,
      isLoading,
      isAuthenticated,
      getAccessTokenSilently,
    } = this.props.auth0;
    const [userInfo, setUserInfo] = this.context;
    console.log(userInfo);
    if (!isLoading) {
      if (isAuthenticated) {
        const AUTH_DOMAIN = "https://chat-api.eu.auth0.com/api/v2/";
        getAccessTokenSilently({
          audience: AUTH_DOMAIN,
          scope: "read:current_user",
        })
          .then((token) =>
            fetch(AUTH_DOMAIN + "users/" + user.sub, {
              headers: { Authorization: "Bearer " + token },
            })
          )
          .then((res) => res.json())
          .then((userData) => {
            console.log("Setting user info");
            this.setState({
              userLoaded: true,
            });
            setUserInfo({
              username: userData.user_metadata.username,
              global_token: userData.app_metadata.global_token,
            });
            navigate("/webchat");
          })
          .catch((err) => {
            console.log(err);
            navigate("/");
          });
      } else {
        navigate("/");
      }
    }
  }
  componentDidMount() {
    console.log("HandlerLogin didMount");
    this.getUserMetadata();
  }
  componentDidUpdate() {
    console.log("HandlerLogin didUpdate");
    if (!this.state.userLoaded) this.getUserMetadata();
  }
  render() {
    console.log("HandlerLogin rendering");
    return <Loading />;
  }
}

export default withAuth0(HandleLogin);
