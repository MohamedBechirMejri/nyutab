import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { LazyMotion, domAnimation } from "framer-motion";
import { getLocalData, setLocalData } from "lib/storageUtils";

const version = getLocalData("version");

console.log("version", version);

if (!version || version.v !== "1.0.0") {
  localStorage.clear();
  setLocalData("version", { v: "1.0.0" });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </React.StrictMode>
);

// TODO: use extensions APIs for storage and location
