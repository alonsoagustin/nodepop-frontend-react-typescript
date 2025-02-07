import Button from "../components/Button";
import { useAuth } from "./context";

const AuthButton = () => {
  const { isLogged } = useAuth();

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
