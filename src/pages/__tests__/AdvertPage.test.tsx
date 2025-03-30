import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import AdvertPage from "../AdvertPage";
import { BrowserRouter } from "react-router-dom";
import { AdvertDeleted } from "../../store/actions/creators";

vi.mock(
  "react-router-dom",
  async (importOriginal: () => Promise<typeof import("react-router-dom")>) => {
    const actual = await importOriginal(); // Importamos la implementación original de react-router-dom
    return {
      ...actual, // Mantener la implementación original de los elementos
      useParams: vi.fn().mockReturnValue({ advertId: "mockId" }), // Mockeamos solo useParams
    };
  }
);

vi.mock("../../store/actions/creators", () => ({
  AdvertDeleted: vi.fn(),
}));

const advert = {
  id: "mockId",
  createdAt: "mockDate",
  name: "mockName",
  sale: true,
  price: 111,
  tags: ["mockTag"],
  photo: "http://mockPhoto.jpg",
};

const state = {
  auth: true,
  adverts: { data: [advert], loaded: false },
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
        <AdvertPage />
      </Provider>
    </BrowserRouter>
  );

describe("AdvertPage", () => {
  test("should render advert page", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should open modal and dispatch delete action", () => {
    renderComponent();
    const deleteButton = screen.getByRole("button");

    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveTextContent(/Delete/);

    fireEvent.click(deleteButton);

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();

    const confirmButton = screen.getByText(/Confirm/);

    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(confirmButton);

    expect(AdvertDeleted).toHaveBeenCalled();
    expect(AdvertDeleted).toHaveBeenCalledWith("mockId", expect.any(Function));
  });
});
