import { Navigate } from "react-router-dom";
import { useAuth } from "./context";

interface Props {
  children: React.ReactNode;
}

const AuthRequire = ({ children }: Props) => {
  const { isLogged } = useAuth();

  return isLogged ? children : <Navigate to="/login" />;
};

export default AuthRequire;
