import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import FormField from "./index";

const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

describe("FormField", () => {
  const baseProps = {
    label: "Email Address",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
  };

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("renders label and text field", () => {
    renderWithTheme(<FormField {...baseProps} />);

    expect(screen.getByText(baseProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(baseProps.placeholder)
    ).toBeInTheDocument();
  });

  it("renders with error state when error prop is provided", () => {
    const errorMessage = "Email is required";
    renderWithTheme(<FormField {...baseProps} error={errorMessage} />);

    expect(screen.getByText(baseProps.label)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(baseProps.placeholder)
    ).toBeInTheDocument();
  });

  it("renders icon when icon prop is provided", () => {
    renderWithTheme(<FormField {...baseProps} icon={<MockIcon />} />);

    expect(screen.getByText(baseProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(baseProps.placeholder)
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("does not render icon when icon prop is not provided", () => {
    renderWithTheme(<FormField {...baseProps} />);

    expect(screen.getByText(baseProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(baseProps.placeholder)
    ).toBeInTheDocument();
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });

  it("does not render error message when error prop is not provided", () => {
    renderWithTheme(<FormField {...baseProps} />);

    expect(screen.getByText(baseProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(baseProps.placeholder)
    ).toBeInTheDocument();
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  it("passes through TextField props correctly", () => {
    const onChange = jest.fn();
    renderWithTheme(
      <FormField
        {...baseProps}
        onChange={onChange}
        disabled={true}
        required={true}
      />
    );

    const textField = screen.getByPlaceholderText(baseProps.placeholder);
    expect(textField).toBeDisabled();
    expect(textField).toBeRequired();

    fireEvent.change(textField, { target: { value: "test@example.com" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("handles input changes correctly", () => {
    const onChange = jest.fn();
    renderWithTheme(<FormField {...baseProps} onChange={onChange} />);

    const textField = screen.getByPlaceholderText(baseProps.placeholder);
    fireEvent.change(textField, { target: { value: "new value" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "new value" }),
      })
    );
  });

  it("renders with different input types", () => {
    renderWithTheme(<FormField {...baseProps} type="password" />);

    const textField = screen.getByPlaceholderText(baseProps.placeholder);
    expect(textField).toHaveAttribute("type", "password");
  });

  it("renders with custom InputProps", () => {
    const customInputProps = {
      inputProps: { "data-testid": "custom-input" },
    };

    renderWithTheme(<FormField {...baseProps} InputProps={customInputProps} />);

    expect(screen.getByTestId("custom-input")).toBeInTheDocument();
  });

  it("combines icon with custom InputProps", () => {
    const customInputProps = {
      inputProps: { "data-testid": "custom-input" },
    };

    renderWithTheme(
      <FormField
        {...baseProps}
        icon={<MockIcon />}
        InputProps={customInputProps}
      />
    );

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByTestId("custom-input")).toBeInTheDocument();
  });

  it("renders with empty error string", () => {
    renderWithTheme(<FormField {...baseProps} error="" />);

    expect(screen.getByText(baseProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(baseProps.placeholder)
    ).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders with undefined error", () => {
    renderWithTheme(<FormField {...baseProps} error={undefined} />);

    expect(screen.getByText(baseProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(baseProps.placeholder)
    ).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
