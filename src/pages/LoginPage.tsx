import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../auth/service";
import { useAuth } from "../auth/context";
import Button from "../components/Button";

const LoginPage = () => {
  // Hook to manage the authentication state
  const { onLogin } = useAuth();

  // Hook to manage the navigation
  const navigate = useNavigate();

  // Hook to manage the location
  const location = useLocation();

  // Hook to manage the inputs state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);

  const isDisabled = !email || !password;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const credentials = { email, password };
      const response = await login(credentials);

      if (checked) {
        localStorage.setItem("accessToken", response);
      }

      // Update the authentication state
      onLogin();

      // Redirect to the previous page or to the home page
      navigate(location.state?.from ?? "/", { replace: true });
    } catch (error) {
      console.error("Error while trying to login", error);
    }
  };

  return (
    <>
      <h2 className="loginPage-title">ACCESS YOUR ACCOUNT</h2>
      <form className="loginPage-form" onSubmit={handleSubmit}>
        <div className="formField">
          <label className="formField-label" htmlFor="email">
            <span>Email:</span>
          </label>
          <input
            className="formField-input"
            type="email"
            name="email"
            id="email"
            placeholder="Insert your email here"
            autoComplete="on"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="formField">
          <label className="formField-label" htmlFor="password">
            <span>Password:</span>
          </label>
          <input
            className="formField-input"
            type="password"
            name="password"
            id="password"
            placeholder="Insert your password here"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="formField">
          <label className="formField-label" htmlFor="remember">
            <span>Remember me</span>
          </label>
          <input
            className="formField-input"
            type="checkbox"
            name="remember"
            id="remember"
            checked={checked}
            onChange={handleRememberChange}
          />
        </div>
        <div className="formField">
          <Link to={"/signup"}>
            <span>I don't have an account yet</span>
          </Link>
        </div>
        <div className="formActions">
          <Button
            className={"loginForm-submit btn"}
            type={"submit"}
            disabled={isDisabled}
          >
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
