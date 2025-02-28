import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Button from "../components/shared/Button";
import FormField from "../components/shared/FormField";
import { AuthLogin, ResetUi } from "../store/actions/creators";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getIsLogged, getUi } from "../store/selectors/selectors";
import Spinner from "../components/shared/Spinner";
import Modal from "../components/shared/Modal";

const LoginPage = () => {
  // Hook to get the authentication state
  const isLogged = useAppSelector(getIsLogged);

  // Hook to get the ui state
  const { error, loading } = useAppSelector(getUi);

  // Hook to dispatch actions
  const dispatch = useAppDispatch();

  // Hook to manage the navigation
  const navigate = useNavigate();

  // Hook to manage the location
  const location = useLocation();

  // Hook to manage the inputs state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);

  // Available only when both email and password are filled
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
    const credentials = { email, password };
    await dispatch(AuthLogin(credentials));
    navigate(location.state?.from ?? "/", { replace: true });
  };

  const handleCloseModal = () => {
    dispatch(ResetUi());
  };

  return (
    <>
      {loading && (
        <div className="container">
          <Spinner isLoading />
        </div>
      )}

      {!loading && error && (
        <Modal
          title={error}
          showModal={!!error}
          onClose={handleCloseModal}
          buttons={[
            {
              textContent: "Try again",
              className: "btn-primary",
              onClick: handleCloseModal,
            },
          ]}
        />
      )}

      {!loading && !error && !isLogged && (
        <>
          <h2 className="text-center mb-4">ACCESS YOUR ACCOUNT</h2>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <form
                className="col-12 col-md-6 col-lg-4 p-4 border rounded"
                onSubmit={handleSubmit}
              >
                <FormField
                  className={{
                    container: "mb-3",
                    labelClass: "form-label",
                    input: "form-control",
                  }}
                  label="Email adress"
                  type="email"
                  id="email"
                  placeholder="Insert your email here"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />

                <FormField
                  className={{
                    container: "mb-3",
                    labelClass: "form-label",
                    input: "form-control",
                  }}
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Insert your password here"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />

                <FormField
                  inputBeforeLable
                  className={{
                    container: "form-check mb-0",
                    labelClass: "form-label",
                    input: "form-check-input",
                  }}
                  label="Remember me"
                  type="checkbox"
                  id="remember"
                  checked={checked}
                  onChange={handleRememberChange}
                />

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
      )}
    </>
  );
};

export default LoginPage;
