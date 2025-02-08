import { createContext, useContext } from "react";

// A context can have a default value, but it is not required.
// The default value will be undefined if not provided.
// We pass a default value to createContext to avoid undefined issues in consumers.

// Friendly reminder:
// - createContext is a function provided by React that creates a context.
// - useContext is a hook provided by React that allows us to consume a context.
// - It is a convention in React to name the custom hooks with the word "use" at the beginning.

interface AuthContextValue {
  isLogged: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

// Create the context with a default value.
export const AuthContext = createContext<AuthContextValue>({
  isLogged: false,
  onLogin: () => {},
  onLogout: () => {},
});

// Create a custom hook to consume the context.
export const useAuth = () => {
  const authValue = useContext(AuthContext);
  return authValue;
};
