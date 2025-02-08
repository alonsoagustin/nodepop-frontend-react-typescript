import Button from "../components/Button";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";

const AuthButton = () => {
  // Hook to manage the authentication state
  const { isLogged, onLogout } = useAuth();

  // Hook to navigate between routes
  const navigate = useNavigate();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Get the text content of the button clicked
    const currentTarget = event.currentTarget.textContent?.trim() as string;

    // Logout the user if the button clicked is "Logout"
    if (currentTarget === "Logout") {
      onLogout();
      localStorage.removeItem("accessToken");
    }

    // Define the routes to navigate to
    const routes: Record<string, string> = {
      Login: "/login",
      Logout: "/login",
      Signup: "/signup",
      New: "/adverts/new",
    };

    // Navigate to the route associated with the button clicked
    navigate(routes[currentTarget]);
  };

  return isLogged ? (
    <>
      <Button className={"btn"} onClick={handleOnClick}>
        New
      </Button>
      <Button className={"btn"} onClick={handleOnClick}>
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button className={"btn"} onClick={handleOnClick}>
        Login
      </Button>
      <Button className={"btn"} onClick={handleOnClick}>
        Signup
      </Button>
    </>
  );
};

export default AuthButton;
