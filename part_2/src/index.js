import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import client from "./config/client";

import App from "./components/App";
import "antd/dist/antd.css";
import "./style.css";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
