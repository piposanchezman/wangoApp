import React from "react";

import "react-native-gesture-handler";

import { Auth0Provider } from "react-native-auth0";

import { ApiContextProvider } from "./src/context/ApiContext";
import { AppContextProvider } from "./src/context/AppContext";
import { AppNav } from "./src/screens/AppNav";

function App(): React.JSX.Element {
  return (
    <Auth0Provider
      domain="dev-kllowhtqsd8qirzp.us.auth0.com"
      clientId="UgFSXXSReYqZJfEcJRewwoQUmJ7TjU0w"
    >
      <AppNav />
    </Auth0Provider>
  );
}

export default App;
