import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomTypography from "./index";

describe("CustomTypography", () => {
  it("renders typography with text content", () => {
    render(<CustomTypography>Hello World</CustomTypography>);

    const typography = screen.getByText("Hello World");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with h1 variant", () => {
    render(<CustomTypography variant="h1">Heading 1</CustomTypography>);

    const typography = screen.getByRole("heading", { level: 1 });
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent("Heading 1");
  });

  it("renders typography with h2 variant", () => {
    render(<CustomTypography variant="h2">Heading 2</CustomTypography>);

    const typography = screen.getByRole("heading", { level: 2 });
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent("Heading 2");
  });

  it("renders typography with h3 variant", () => {
    render(<CustomTypography variant="h3">Heading 3</CustomTypography>);

    const typography = screen.getByRole("heading", { level: 3 });
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent("Heading 3");
  });

  it("renders typography with h4 variant", () => {
    render(<CustomTypography variant="h4">Heading 4</CustomTypography>);

    const typography = screen.getByRole("heading", { level: 4 });
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent("Heading 4");
  });

  it("renders typography with h5 variant", () => {
    render(<CustomTypography variant="h5">Heading 5</CustomTypography>);

    const typography = screen.getByRole("heading", { level: 5 });
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent("Heading 5");
  });

  it("renders typography with h6 variant", () => {
    render(<CustomTypography variant="h6">Heading 6</CustomTypography>);

    const typography = screen.getByRole("heading", { level: 6 });
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent("Heading 6");
  });

  it("renders typography with body1 variant", () => {
    render(<CustomTypography variant="body1">Body text</CustomTypography>);

    const typography = screen.getByText("Body text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with body2 variant", () => {
    render(
      <CustomTypography variant="body2">Small body text</CustomTypography>
    );

    const typography = screen.getByText("Small body text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with subtitle1 variant", () => {
    render(<CustomTypography variant="subtitle1">Subtitle 1</CustomTypography>);

    const typography = screen.getByText("Subtitle 1");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with subtitle2 variant", () => {
    render(<CustomTypography variant="subtitle2">Subtitle 2</CustomTypography>);

    const typography = screen.getByText("Subtitle 2");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with caption variant", () => {
    render(<CustomTypography variant="caption">Caption text</CustomTypography>);

    const typography = screen.getByText("Caption text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with overline variant", () => {
    render(
      <CustomTypography variant="overline">Overline text</CustomTypography>
    );

    const typography = screen.getByText("Overline text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with custom color", () => {
    render(
      <CustomTypography color="primary">Primary colored text</CustomTypography>
    );

    const typography = screen.getByText("Primary colored text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with error color", () => {
    render(
      <CustomTypography color="error">Error colored text</CustomTypography>
    );

    const typography = screen.getByText("Error colored text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with custom alignment", () => {
    render(<CustomTypography align="center">Centered text</CustomTypography>);

    const typography = screen.getByText("Centered text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with gutter bottom", () => {
    render(<CustomTypography gutterBottom>Text with gutter</CustomTypography>);

    const typography = screen.getByText("Text with gutter");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with no wrap", () => {
    render(<CustomTypography noWrap>No wrap text</CustomTypography>);

    const typography = screen.getByText("No wrap text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with custom className", () => {
    render(
      <CustomTypography className="custom-typography">
        Custom styled text
      </CustomTypography>
    );

    const typography = screen.getByText("Custom styled text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with custom style", () => {
    const customStyle = { fontSize: "20px", fontWeight: "bold" };
    render(
      <CustomTypography style={customStyle}>Styled text</CustomTypography>
    );

    const typography = screen.getByText("Styled text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with paragraph variant", () => {
    render(
      <CustomTypography variant="body1" paragraph>
        Paragraph text
      </CustomTypography>
    );

    const typography = screen.getByText("Paragraph text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with display variants", () => {
    render(
      <CustomTypography variant="h1" display="block">
        Display text
      </CustomTypography>
    );

    const typography = screen.getByText("Display text");
    expect(typography).toBeInTheDocument();
  });

  it("renders typography with custom component", () => {
    render(
      <CustomTypography component="span">Span element text</CustomTypography>
    );

    const typography = screen.getByText("Span element text");
    expect(typography).toBeInTheDocument();
  });
});
