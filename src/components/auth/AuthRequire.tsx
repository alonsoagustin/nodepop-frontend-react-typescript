import { Navigate } from "react-router-dom";
// import { useAuth } from "./context";
import { useSelector } from "react-redux";
import { getIsLogged } from "../../store/selectors/selectors";

interface Props {
  children: React.ReactNode;
}

const AuthRequire = ({ children }: Props) => {
  // const { isLogged } = useAuth();

  // Hook to get the authentication state
  const isLogged = useSelector(getIsLogged);

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default AuthRequire;
