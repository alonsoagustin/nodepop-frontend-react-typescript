import { render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

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
          subscribe: () => {},
          dispatch: () => {},
        }}
      >
        <LoginPage />
      </Provider>
    </BrowserRouter>
  );

describe("LoginPage", () => {
  test("should render login form", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
