import React, { useState } from "react";
import "./App.css";
import Register from "layouts/register";
import Landing from "layouts/landing";

import store from "redux-functionality/index";
import { Provider } from "react-redux";
import SignedIn from "layouts/signedIn";

// markup
const IndexPage = () => {
  const [signedIn, setSignedIn] = useState<Boolean>(false);
  const [register, setRegister] = useState<Boolean>(false);

  const renderNotSignedIn = () => {
    switch (register) {
      case true:
        return (
          <Register
            onRegister={() => {
              setRegister(false);
            }}
            onReturnToSignIn={() => {
              setRegister(false);
            }}
          />
        );
      case false:
        return (
          <Landing
            onRegister={() => {
              setRegister(true);
            }}
            onSignIn={() => {
              setSignedIn(true);
            }}
          />
        );
    }
  };

  const renderLayout = () => {
    switch (signedIn) {
      case true:
        return <SignedIn />;
      case false:
        return renderNotSignedIn();
    }
  };

  return <Provider store={store}>{renderLayout()}</Provider>;
};

export default IndexPage;
