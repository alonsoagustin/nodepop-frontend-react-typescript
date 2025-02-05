import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// Get the root element from the HTML document
// We use the non-null assertion operator (!) to tell TypeScript that root will never be null
const root = document.getElementById("root")!;

// Render the App component inside the root element
// Enable StrictMode in development mode to detect potential issues in components
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
