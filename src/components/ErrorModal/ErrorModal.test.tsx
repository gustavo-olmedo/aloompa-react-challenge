import { render, screen, fireEvent } from "@testing-library/react";
import ErrorModal, { CustomError } from "./";

describe("ErrorModal", () => {
  const errorMessage = "This is a test error";
  const mockClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not render if open is false", () => {
    const { container } = render(
      <ErrorModal
        error={new Error(errorMessage)}
        open={false}
        onRequestClose={mockClose}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("does not render if error is undefined", () => {
    const { container } = render(
      <ErrorModal error={undefined} open={true} onRequestClose={mockClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders error message if error is a string", () => {
    render(
      <ErrorModal
        error="Custom error string"
        open={true}
        onRequestClose={mockClose}
      />
    );
    expect(screen.getByText("Custom error string")).toBeInTheDocument();
  });

  it("renders error.message if error is an Error object", () => {
    render(
      <ErrorModal
        error={new Error(errorMessage)}
        open={true}
        onRequestClose={mockClose}
      />
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders fallback message if error shape is unexpected", () => {
    const weirdError = { unknownField: true } as CustomError; // Force weird shape
    render(
      <ErrorModal error={weirdError} open={true} onRequestClose={mockClose} />
    );
    expect(
      screen.getByText("An unexpected error occurred.")
    ).toBeInTheDocument();
  });

  it("calls onRequestClose when backdrop is clicked", () => {
    render(<ErrorModal error="Test" open={true} onRequestClose={mockClose} />);
    fireEvent.click(screen.getByText("Error").parentElement!.parentElement!); // Backdrop
    expect(mockClose).toHaveBeenCalled();
  });

  it("calls onRequestClose when close button is clicked", () => {
    render(<ErrorModal error="Test" open={true} onRequestClose={mockClose} />);
    fireEvent.click(screen.getByText("×"));
    expect(mockClose).toHaveBeenCalled();
  });

  it("does NOT call onRequestClose when modal itself is clicked", () => {
    render(<ErrorModal error="Test" open={true} onRequestClose={mockClose} />);
    fireEvent.click(screen.getByText("Error").parentElement!); // Modal
    expect(mockClose).not.toHaveBeenCalled();
  });
});
