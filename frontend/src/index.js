import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ConnectionApp from "./connectionsComponents/connectionsApp/ConnectionsApp";
import "./connectionsReset.css";
import "./connectionsStyles.css";
import "./tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (window.location.pathname === "/connections.html") {
  root.render(
    <React.StrictMode>
      <ConnectionApp /> {/* Correctly renders ConnectionApp for /connections.html */}
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App /> {/* Default rendering */}
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
