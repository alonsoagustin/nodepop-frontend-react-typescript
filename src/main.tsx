import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";

// Get the root element from the HTML document
// We use the non-null assertion operator (!) to tell TypeScript that root will never be null
const root = document.getElementById("root")!;

const accessToken = localStorage.getItem("accessToken");

// Render the App component inside the root element
// Enable StrictMode in development mode to detect potential issues in components
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider defaultIsLogged={!!accessToken}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
