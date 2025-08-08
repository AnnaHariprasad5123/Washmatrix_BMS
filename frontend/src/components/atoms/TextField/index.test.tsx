import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomTextField from "./index";

describe("CustomTextField", () => {
  it("renders text field with label", () => {
    render(<CustomTextField label="Username" />);

    const textField = screen.getByLabelText("Username");
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveAttribute("type", "text");
  });

  it("renders text field with placeholder", () => {
    render(<CustomTextField placeholder="Enter your name" />);

    const textField = screen.getByPlaceholderText("Enter your name");
    expect(textField).toBeInTheDocument();
  });

  it("handles text input changes", () => {
    render(<CustomTextField label="Email" />);

    const textField = screen.getByLabelText("Email");
    fireEvent.change(textField, { target: { value: "test@example.com" } });

    expect(textField).toHaveValue("test@example.com");
  });

  it("renders text field with default value", () => {
    render(<CustomTextField label="Name" defaultValue="John Doe" />);

    const textField = screen.getByLabelText("Name");
    expect(textField).toHaveValue("John Doe");
  });

  it("renders text field with value prop", () => {
    render(<CustomTextField label="Title" value="Book Title" />);

    const textField = screen.getByLabelText("Title");
    expect(textField).toHaveValue("Book Title");
  });

  it("renders text field with helper text", () => {
    render(
      <CustomTextField
        label="Password"
        helperText="Password must be at least 8 characters"
      />
    );

    const helperText = screen.getByText(
      "Password must be at least 8 characters"
    );
    expect(helperText).toBeInTheDocument();
  });

  it("renders text field with error state", () => {
    render(
      <CustomTextField label="Email" error helperText="Invalid email address" />
    );

    const textField = screen.getByLabelText("Email");
    const helperText = screen.getByText("Invalid email address");

    expect(textField).toBeInTheDocument();
    expect(helperText).toBeInTheDocument();
  });

  it("renders text field with required prop", () => {
    render(<CustomTextField label="Username" required />);

    const textField = screen.getByLabelText("Username *");
    expect(textField).toBeInTheDocument();
    expect(textField).toBeRequired();
  });

  it("renders text field with disabled state", () => {
    render(<CustomTextField label="Disabled Field" disabled />);

    const textField = screen.getByLabelText("Disabled Field");
    expect(textField).toBeDisabled();
  });

  it("renders text field with different variants", () => {
    render(<CustomTextField label="Outlined Field" variant="outlined" />);

    const textField = screen.getByLabelText("Outlined Field");
    expect(textField).toBeInTheDocument();
  });

  it("renders text field with different sizes", () => {
    render(<CustomTextField label="Small Field" size="small" />);

    const textField = screen.getByLabelText("Small Field");
    expect(textField).toBeInTheDocument();
  });

  it("renders text field with full width", () => {
    render(<CustomTextField label="Full Width Field" fullWidth />);

    const textField = screen.getByLabelText("Full Width Field");
    expect(textField).toBeInTheDocument();
  });

  it("renders text field with multiline support", () => {
    render(<CustomTextField label="Description" multiline rows={4} />);

    const textField = screen.getByLabelText("Description");
    expect(textField).toBeInTheDocument();
  });

  it("renders text field with max length", () => {
    render(
      <CustomTextField label="Limited Text" inputProps={{ maxLength: 10 }} />
    );

    const textField = screen.getByLabelText("Limited Text");
    expect(textField).toHaveAttribute("maxLength", "10");
  });

  it("renders text field with custom className", () => {
    render(
      <CustomTextField label="Custom Field" className="custom-text-field" />
    );

    const textField = screen.getByLabelText("Custom Field");
    expect(textField).toBeInTheDocument();
  });

  it("renders text field with different types", () => {
    render(<CustomTextField label="Email Field" type="email" />);

    const textField = screen.getByLabelText("Email Field");
    expect(textField).toHaveAttribute("type", "email");
  });

  it("renders text field with auto focus", () => {
    render(<CustomTextField label="Auto Focus Field" autoFocus />);

    const textField = screen.getByLabelText("Auto Focus Field");
    expect(textField).toBeInTheDocument();
  });
});
