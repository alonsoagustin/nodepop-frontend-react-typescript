import { ReactNode, useState } from "react";
import { AuthContext } from "./context";

// AuthProvider wraps the app and provides authentication state to all child components.
// It manages the login state and exposes an object with three properties:
// - isLogged: boolean indicating the login status.
// - onLogin: function to log in.
// - onLogout: function to log out.

// Friendly reminder:
// - useState is a hook provided by React that allows us to add state to functional components.
// - useState returns an array with two elements: the state value and a function to update it.
// - The context is provided through the `value` prop of AuthContext.Provider.
// - All child components of AuthProvider can access it using the `useContext` hook.

interface Props {
  defaultIsLogged: boolean;
  children: ReactNode;
}

export const AuthProvider = ({ defaultIsLogged, children }: Props) => {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };
  const handleLogout = () => {
    setIsLogged(false);
  };

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
