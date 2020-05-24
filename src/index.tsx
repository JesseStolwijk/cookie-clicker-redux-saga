import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Index from "./pages/Index";
import { store } from "./store";
import { Provider } from "react-redux";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
