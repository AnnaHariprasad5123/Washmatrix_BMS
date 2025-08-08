import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import NotFound from "./index";
import { useNavigate } from "react-router-dom";

jest.mock("../../assets/icons/svg/bookBlue.svg", () => "book-blue-icon");

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../utils/constants", () => ({
  NOT_FOUND_CONSTANTS: {
    TITLE: "404 - Page Not Found",
    SUBTITLE: "Oops! The page you're looking for doesn't exist.",
    DESCRIPTION:
      "The page you are trying to access might have been moved, deleted, or you entered the wrong URL.",
    GO_HOME_BUTTON: "Go to Home",
    GO_BACK_BUTTON: "Go Back",
    ERROR_CODE: "404",
  },
  ROUTES: {
    HOME: "/",
  },
}));

describe("NotFound", () => {
  const mockNavigate = jest.fn();

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders 404 error page with all elements", () => {
    renderWithTheme(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("Oops! The page you're looking for doesn't exist.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you are trying to access might have been moved, deleted, or you entered the wrong URL."
      )
    ).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    renderWithTheme(<NotFound />);

    expect(screen.getByText("Go to Home")).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("calls navigate to home when go home button is clicked", () => {
    renderWithTheme(<NotFound />);

    fireEvent.click(screen.getByText("Go to Home"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("calls navigate back when go back button is clicked", () => {
    renderWithTheme(<NotFound />);

    fireEvent.click(screen.getByText("Go Back"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("renders book icon", () => {
    renderWithTheme(<NotFound />);

    const bookIcon = screen.getByAltText("Book");
    expect(bookIcon).toBeInTheDocument();
    expect(bookIcon).toHaveAttribute("src", "book-blue-icon");
  });

  it("displays error code prominently", () => {
    renderWithTheme(<NotFound />);

    const errorCode = screen.getByText("404");
    expect(errorCode).toBeInTheDocument();
    expect(errorCode.tagName).toBe("H1");
  });
});
