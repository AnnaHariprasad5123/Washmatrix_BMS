import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomIcon from "./index";

describe("CustomIcon", () => {
  const defaultProps = {
    src: "/test-icon.svg",
    alt: "Test Icon",
  };

  it("renders icon with required props", () => {
    render(<CustomIcon {...defaultProps} />);

    const icon = screen.getByRole("img", { name: "Test Icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/test-icon.svg");
    expect(icon).toHaveAttribute("alt", "Test Icon");
  });

  it("renders icon with custom className", () => {
    render(<CustomIcon {...defaultProps} className="custom-icon-class" />);

    const icon = screen.getByRole("img", { name: "Test Icon" });
    expect(icon).toHaveClass("custom-icon-class");
  });

  it("renders icon with custom style", () => {
    const customStyle = { width: "24px", height: "24px" };
    render(<CustomIcon {...defaultProps} style={customStyle} />);

    const icon = screen.getByRole("img", { name: "Test Icon" });
    expect(icon).toHaveStyle("width: 24px");
    expect(icon).toHaveStyle("height: 24px");
  });

  it("renders icon with both className and style", () => {
    const customStyle = { color: "red" };
    render(
      <CustomIcon
        {...defaultProps}
        className="icon-class"
        style={customStyle}
      />
    );

    const icon = screen.getByRole("img", { name: "Test Icon" });
    expect(icon).toHaveClass("icon-class");
    expect(icon).toHaveStyle("color: red");
  });

  it("renders icon with different src and alt values", () => {
    render(
      <CustomIcon src="/different-icon.png" alt="Different Icon Description" />
    );

    const icon = screen.getByRole("img", {
      name: "Different Icon Description",
    });
    expect(icon).toHaveAttribute("src", "/different-icon.png");
    expect(icon).toHaveAttribute("alt", "Different Icon Description");
  });

  it("renders icon without optional props", () => {
    render(<CustomIcon src="/simple-icon.svg" alt="Simple Icon" />);

    const icon = screen.getByRole("img", { name: "Simple Icon" });
    expect(icon).toBeInTheDocument();
    expect(icon).not.toHaveClass();
    expect(icon).not.toHaveAttribute("style");
  });

  it("renders icon with empty string className", () => {
    render(<CustomIcon {...defaultProps} className="" />);

    const icon = screen.getByRole("img", { name: "Test Icon" });
    expect(icon).toHaveAttribute("class", "");
  });

  it("renders icon with empty style object", () => {
    render(<CustomIcon {...defaultProps} style={{}} />);

    const icon = screen.getByRole("img", { name: "Test Icon" });
    expect(icon).toBeInTheDocument();
  });
});
