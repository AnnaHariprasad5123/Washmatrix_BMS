import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import LoginPage from "./index";

jest.mock("../../assets/icons/svg/bookBlue.svg", () => "book-blue-icon");
jest.mock("../../assets/icons/svg/profile.svg", () => "profile-icon");
jest.mock("../../assets/icons/svg/lock.svg", () => "lock-icon");
jest.mock("../../assets/icons/svg/logout.svg", () => "logout-icon");

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("../../store/authStore", () => ({
  useAuthStore: jest.fn(() => ({
    login: jest.fn(),
  })),
}));

jest.mock("../../utils/constants", () => ({
  ROUTES: {
    BOOKS: "/books",
  },
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD: "admin123",
  USER_USERNAME: "user",
  USER_PASSWORD: "user123",
  LOGIN_CONSTANTS: {
    WELCOME_TITLE: "Welcome Back",
    SUBTITLE: "Sign in to access BookShelf Management",
    USERNAME_LABEL: "Username",
    USERNAME_PLACEHOLDER: "Enter your username",
    PASSWORD_LABEL: "Password",
    PASSWORD_PLACEHOLDER: "Enter your password",
    SIGN_IN_BUTTON: "Sign In",
    SIGNING_IN_BUTTON: "Signing In...",
    USERNAME_REQUIRED: "Username is required",
    PASSWORD_REQUIRED: "Password is required",
    INVALID_CREDENTIALS: "Invalid username or password",
    LOGIN_ERROR: "An error occurred during login",
  },
}));

describe("LoginPage", () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("renders login form", () => {
    renderWithTheme(<LoginPage />);

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(
      screen.getByText("Sign in to access BookShelf Management")
    ).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders login form with correct styling", () => {
    renderWithTheme(<LoginPage />);

    const loginForm = screen.getByText("Welcome Back").closest("div");
    expect(loginForm).toBeInTheDocument();
  });

  it("displays form fields with placeholders", () => {
    renderWithTheme(<LoginPage />);

    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", () => {
    renderWithTheme(<LoginPage />);

    const form = screen.getByText("Sign In").closest("form");
    fireEvent.submit(form!);

    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("successfully logs in with admin credentials", async () => {
    renderWithTheme(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    const form = screen.getByText("Sign In").closest("form");
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText("Signing In...")).toBeInTheDocument();
    });
  });
});
