import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { LazyMotion, domAnimation } from "framer-motion";

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
