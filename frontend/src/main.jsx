// frontend/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import ErrorBoundary from "./components/ErrorBoundary"; // Importa ErrorBoundary
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
