import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./styles/index.scss";
import { store } from "./app/store";
import { IconContext } from "@phosphor-icons/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IconContext.Provider
      value={{
        size: 25,
        weight: "bold",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </IconContext.Provider>
  </React.StrictMode>
);
