import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import App from "./App.jsx";
import { Login } from "./Login.jsx";
import { PositionProvider } from "./contexts";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<PositionProvider>
			<StrictMode>
				<Analytics />
				<SpeedInsights />
				<Routes>
					<Route index element={<App/>}/>
					<Route path="login" element={<Login/>} />
				</Routes>
			</StrictMode>
		</PositionProvider>
	</BrowserRouter>
);
