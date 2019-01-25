import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import client from "./config/client";
import registerServiceWorker from "./registerServiceWorker";

import App from "./components/App";
import "./style.css";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();

//GraphQL Mutation with Apollo Client in React
