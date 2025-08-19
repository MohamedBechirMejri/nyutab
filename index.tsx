import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { domAnimation, LazyMotion } from "framer-motion";
import { scan } from "react-scan";
import App from "./app";

scan({
	enabled: import.meta.env.VITE_SCAN_ENABLED === "true",
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<LazyMotion features={domAnimation}>
			<App />
		</LazyMotion>
	</React.StrictMode>,
);

// TODO: use extensions APIs for storage and location
