import { render } from "@testing-library/react";
import Spinner from "../Spinner";

describe("Spinner", () => {
  test("should render spinner", () => {
    const { container } = render(<Spinner isLoading />);
    expect(container).toMatchSnapshot("spinner-loading");
  });

  test("should not render spinner", () => {
    const { container } = render(<Spinner isLoading={false} />);
    expect(container).toMatchSnapshot("spinner-not-loading");
  });
});
