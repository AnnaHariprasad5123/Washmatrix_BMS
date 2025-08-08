import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomButton from "./index";

describe("CustomButton", () => {
  it("renders button with default props", () => {
    render(<CustomButton>Click me</CustomButton>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Click me</CustomButton>);

    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant prop correctly", () => {
    render(<CustomButton variant="contained">Contained Button</CustomButton>);

    const button = screen.getByRole("button", { name: "Contained Button" });
    expect(button).toHaveClass("MuiButton-contained");
  });

  it("applies color prop correctly", () => {
    render(<CustomButton color="primary">Primary Button</CustomButton>);

    const button = screen.getByRole("button", { name: "Primary Button" });
    expect(button).toHaveClass("MuiButton-colorPrimary");
  });

  it("applies size prop correctly", () => {
    render(<CustomButton size="large">Large Button</CustomButton>);

    const button = screen.getByRole("button", { name: "Large Button" });
    expect(button).toHaveClass("MuiButton-sizeLarge");
  });

  it("applies disabled state correctly", () => {
    render(<CustomButton disabled>Disabled Button</CustomButton>);

    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
  });

  it("applies custom className prop", () => {
    render(<CustomButton className="custom-class">Custom Button</CustomButton>);

    const button = screen.getByRole("button", { name: "Custom Button" });
    expect(button).toHaveClass("custom-class");
  });

  it("forwards all props to underlying Button component", () => {
    render(
      <CustomButton
        data-testid="test-button"
        aria-label="Test button"
        title="Button tooltip"
      >
        Test Button
      </CustomButton>
    );

    const button = screen.getByTestId("test-button");
    expect(button).toHaveAttribute("aria-label", "Test button");
    expect(button).toHaveAttribute("title", "Button tooltip");
  });

  it("renders with different button types", () => {
    render(<CustomButton type="submit">Submit Button</CustomButton>);

    const button = screen.getByRole("button", { name: "Submit Button" });
    expect(button).toHaveAttribute("type", "submit");
  });
});
