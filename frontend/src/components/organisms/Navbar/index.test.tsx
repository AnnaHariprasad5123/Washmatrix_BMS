import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import Navbar from "./index";

jest.mock("../../../assets/icons/svg/logo.svg", () => "logo-icon");
jest.mock("../../../assets/icons/svg/add.svg", () => "add-icon");
jest.mock("../../../assets/icons/svg/profile.svg", () => "profile-icon");
jest.mock("../../../assets/icons/svg/logout.svg", () => "logout-icon");

jest.mock("../../../utils/constants", () => ({
  NAVBAR_CONSTANTS: {
    APP_TITLE: "BookShelf",
    SUBTITLE: "Management System",
    ADD_BOOK_BUTTON: "Add Book",
    LOGOUT_MENU_ITEM: "Logout",
    ADMIN_SUFFIX: "(Admin)",
    USER_SUFFIX: "(User)",
  },
}));

describe("Navbar", () => {
  const baseProps = {
    onAddBook: jest.fn(),
    onLogout: jest.fn(),
    username: "testuser",
  };

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("renders navbar with logo and title", () => {
    renderWithTheme(<Navbar {...baseProps} />);

    expect(screen.getByText("BookShelf")).toBeInTheDocument();
    expect(screen.getByText("Management System")).toBeInTheDocument();
  });

  it("shows add book button when isAdmin is true", () => {
    renderWithTheme(<Navbar {...baseProps} isAdmin={true} />);

    expect(screen.getByText("Add Book")).toBeInTheDocument();
  });

  it("does not show add book button when isAdmin is false", () => {
    renderWithTheme(<Navbar {...baseProps} isAdmin={false} />);

    expect(screen.queryByText("Add Book")).not.toBeInTheDocument();
  });

  it("displays username with admin suffix when isAdmin is true", () => {
    renderWithTheme(<Navbar {...baseProps} isAdmin={true} />);

    expect(screen.getByText("testuser (Admin)")).toBeInTheDocument();
  });

  it("displays username with user suffix when isAdmin is false", () => {
    renderWithTheme(<Navbar {...baseProps} isAdmin={false} />);

    expect(screen.getByText("testuser (User)")).toBeInTheDocument();
  });

  it("calls onAddBook when add book button is clicked", () => {
    renderWithTheme(<Navbar {...baseProps} isAdmin={true} />);

    fireEvent.click(screen.getByText("Add Book"));

    expect(baseProps.onAddBook).toHaveBeenCalled();
  });

  it("opens logout menu when user section is clicked", () => {
    renderWithTheme(<Navbar {...baseProps} />);

    const userSection = screen.getByText("testuser (User)").closest("div");
    fireEvent.click(userSection!);

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls onLogout when logout menu item is clicked", () => {
    renderWithTheme(<Navbar {...baseProps} />);

    const userSection = screen.getByText("testuser (User)").closest("div");
    fireEvent.click(userSection!);

    fireEvent.click(screen.getByText("Logout"));

    expect(baseProps.onLogout).toHaveBeenCalled();
  });

  it("displays empty username when username is not provided", () => {
    renderWithTheme(<Navbar {...baseProps} username="" />);

    expect(screen.getByText("(User)")).toBeInTheDocument();
  });

  it("displays admin badge correctly for admin user", () => {
    renderWithTheme(<Navbar {...baseProps} isAdmin={true} username="admin" />);

    expect(screen.getByText("admin (Admin)")).toBeInTheDocument();
  });

  it("displays user badge correctly for regular user", () => {
    renderWithTheme(<Navbar {...baseProps} isAdmin={false} username="user" />);

    expect(screen.getByText("user (User)")).toBeInTheDocument();
  });

  it("handles undefined username parameter", () => {
    const propsWithoutUsername = {
      onAddBook: jest.fn(),
      onLogout: jest.fn(),
    };

    renderWithTheme(<Navbar {...propsWithoutUsername} />);

    expect(screen.getByText("(User)")).toBeInTheDocument();
  });
});
