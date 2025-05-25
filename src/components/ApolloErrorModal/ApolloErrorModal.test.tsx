import { render, screen, fireEvent } from "@testing-library/react";
import ApolloErrorModal from "./";
import { ApolloError } from "@apollo/client";

jest.mock("../ErrorModal", () => ({
  __esModule: true,
  default: ({ error, open, onRequestClose }: any) =>
    open ? (
      <div data-testid="error-modal">
        <p>{error?.message}</p>
        <button onClick={onRequestClose}>Close</button>
      </div>
    ) : null,
}));

describe("ApolloErrorModal", () => {
  it("shows modal when apolloError is provided", () => {
    const error = new ApolloError({
      errorMessage: "Something went wrong",
    });
    render(<ApolloErrorModal apolloError={error} />);
    expect(screen.getByTestId("error-modal")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("shows modal when Error is provided", () => {
    const error = Error("Something went wrong");
    render(<ApolloErrorModal apolloError={error} />);
    expect(screen.getByTestId("error-modal")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("does not show modal when apolloError is undefined", () => {
    render(<ApolloErrorModal apolloError={undefined} />);
    expect(screen.queryByTestId("error-modal")).toBeNull();
  });

  it("closes modal when onRequestClose is triggered", () => {
    const error = new Error("Close me");
    render(<ApolloErrorModal apolloError={error} />);
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("error-modal")).toBeNull();
  });
});
