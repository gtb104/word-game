import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button component", () => {
  test("renders primary button correctly", () => {
    render(<Button isPrimary={true}>Submit</Button>);
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("my-button primary");
    expect(buttonElement).toHaveTextContent("Submit");
  });

  test("renders secondary button correctly", () => {
    render(<Button>Cancel</Button>);
    const buttonElement = screen.getByRole("button", { name: /cancel/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("my-button");
    expect(buttonElement).not.toHaveClass("primary");
    expect(buttonElement).toHaveTextContent("Cancel");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick}>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test("handles undefined onClick", () => {
    // This test verifies that the component doesn't crash without an onClick
    expect(() => {
      render(<Button>No Click Handler</Button>);
    }).not.toThrow();

    const buttonElement = screen.getByRole("button", {
      name: /no click handler/i,
    });
    expect(() => {
      fireEvent.click(buttonElement);
    }).not.toThrow();
  });

  test("renders with additional HTML attributes", () => {
    render(
      <Button
        isPrimary={true}
        data-testid="test-button"
        disabled={true}
        aria-label="Test button"
      >
        Test
      </Button>
    );

    const buttonElement = screen.getByTestId("test-button");
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveAttribute("aria-label", "Test button");
  });

  test("applies custom className alongside default classes", () => {
    render(
      <Button className="custom-style">
        Custom Class
      </Button>
    );

    const buttonElement = screen.getByRole("button", { name: /custom class/i });
    expect(buttonElement).toHaveClass("my-button");
    expect(buttonElement).toHaveClass("custom-style");
  });

  test("handles empty label", () => {
    render(<Button></Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("");
  });
});
