import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </ApolloProvider> */}
  </React.StrictMode>
);