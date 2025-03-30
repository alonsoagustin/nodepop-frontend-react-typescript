import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthLogin } from "../../store/actions/creators";

vi.mock("../../store/actions/creators");

const state = {
  auth: false,
  ui: { error: "", loading: false },
};

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Provider
        store={{
          getState: () => state,
          subscribe: vi.fn(),
          dispatch: vi.fn(),
          replaceReducer: vi.fn(),
          [Symbol.observable]: vi.fn(),
        }}
      >
        <LoginPage />
      </Provider>
    </BrowserRouter>
  );

describe("LoginPage", () => {
  const credentials = { email: "mock@email.com", password: "mockPassword" };
  test("should render login form", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("shoud dispatch login action", () => {
    renderComponent();
    const email = screen.getByLabelText(/Email adress/);
    const password = screen.getByLabelText(/Password/);
    const submit = screen.getByRole("button");

    expect(submit).toBeDisabled();
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent(/Login/);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();

    fireEvent.change(email, { target: { value: credentials.email } });
    fireEvent.change(password, { target: { value: credentials.password } });

    expect(submit).not.toBeDisabled();

    fireEvent.click(submit);

    expect(AuthLogin).toHaveBeenCalled();
    expect(AuthLogin).toHaveBeenCalledWith(credentials);
  });
});
