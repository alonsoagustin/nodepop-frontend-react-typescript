import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./components/auth/AuthProvider";
// import { AdvertsProvider } from "./pages/AdvertsProvider";
import { Provider } from "react-redux";
import configureStore from "./store/store";

// Get the root element from the HTML document
// We use the non-null assertion operator (!) to tell TypeScript that root will never be null
const root = document.getElementById("root")!;

const accessToken = localStorage.getItem("accessToken");

// Create the Redux store with the initial state
const store = configureStore({ auth: !!accessToken });

// Render the App component inside the root element
// Enable StrictMode in development mode to detect potential issues in components
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      {/* <AuthProvider defaultIsLogged={!!accessToken}> */}
      {/* <AdvertsProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </AdvertsProvider> */}
      {/* </AuthProvider> */}
    </BrowserRouter>
  </StrictMode>
);
