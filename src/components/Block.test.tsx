import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Block from "./Block";

describe("Block Component", () => {
  it("renders the character passed as a prop", () => {
    const testChar = "A";
    render(<Block char={testChar} />);
    const blockElement = screen.getByText(testChar);
    expect(blockElement).toBeInTheDocument();
    expect(blockElement).toHaveClass("block");
  });

  it("renders a numeric character correctly", () => {
    render(<Block char="5" />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders a special character correctly", () => {
    render(<Block char="@" />);
    expect(screen.getByText("@")).toBeInTheDocument();
  });

  it("renders an empty string character", () => {
    const { container } = render(<Block char="" />);
    const blockElement = container.querySelector(".block");
    expect(blockElement).toBeInTheDocument();
    expect(blockElement!.textContent).toBe("");
  });

  it ("handles click", () => {
    const handler = jest.fn();
    render(<Block char="X" onClick={handler}></Block>);
    const el = screen.getByText("X");
    fireEvent.click(el);
    expect(handler).toHaveBeenCalled();
  });

  it("doesn't throw error when onClick is not provided", () => {
    expect(() => {
      render(<Block char="B" />);
      fireEvent.click(screen.getByText("B"));
    }).not.toThrow();
  });
});
