import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../components/auth/service";
import { useAuth } from "../components/auth/context";
import Button from "../components/shared/Button";

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
      <h2 className="text-center mb-4">ACCESS YOUR ACCOUNT</h2>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <form
            className="col-12 col-md-6 col-lg-4 p-4 border rounded"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                <span>Email address </span>
              </label>
              <input
                className="form-control"
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
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                <span>Password</span>
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Insert your password here"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-check mb-0">
              <input
                className="form-check-input "
                type="checkbox"
                name="remember"
                id="remember"
                checked={checked}
                onChange={handleRememberChange}
              />
              <label className="form-label" htmlFor="remember">
                <span>Remember me</span>
              </label>
            </div>
            <div className="mb-3">
              <Link to={"/signup"}>
                <span className="btn btn-link">
                  I don't have an account yet
                </span>
              </Link>
            </div>
            <div className="d-flex justify-content-end ">
              <Button
                className={"btn btn-primary"}
                type={"submit"}
                disabled={isDisabled}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
