import React from "react";
import { metadataContext } from "../contexts/MetadataContext";
import { withAuth0 } from "@auth0/auth0-react";
import { navigate } from "@reach/router";
import Loading from "../components/Loading";

class HandleLogin extends React.Component {
  static contextType = metadataContext;
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
    const [metadata, setMetadata] = this.context;
    console.log(metadata);
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
            const metadata = {
              userData: userData.user_metadata,
              appData: userData.app_metadata,
            };
            setMetadata(metadata);
            console.log(metadata);
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
