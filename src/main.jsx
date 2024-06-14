import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import { StudentProvider } from "./context/StudentProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <StudentProvider>
          <App />
        </StudentProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
