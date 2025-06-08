import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/theme-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
