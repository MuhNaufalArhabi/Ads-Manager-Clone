import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/index.css";
import { DefaultContext } from "./contex/appContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <DefaultContext>
      <App />
    </DefaultContext>
);
