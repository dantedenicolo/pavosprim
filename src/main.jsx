import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<NextUIProvider>
			<App />
		</NextUIProvider>
	</BrowserRouter>
);
