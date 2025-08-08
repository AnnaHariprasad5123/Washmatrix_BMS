import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import LoginForm from "./index";
import { useAuthStore } from "../../../store/authStore";

jest.mock("../../../assets/icons/svg/bookBlue.svg", () => "book-blue-icon");
jest.mock("../../../assets/icons/svg/profile.svg", () => "profile-icon");
jest.mock("../../../assets/icons/svg/lock.svg", () => "lock-icon");
jest.mock("../../../assets/icons/svg/logout.svg", () => "logout-icon");

jest.mock("../../../store/authStore", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock("../../../utils/constants", () => ({
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

describe("LoginForm", () => {
  const mockLogin = jest.fn();
  const mockOnLoginSuccess = jest.fn();

  const baseProps = {
    onLoginSuccess: mockOnLoginSuccess,
  };

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  it("renders login form with all elements", () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(
      screen.getByText("Sign in to access BookShelf Management")
    ).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const form = screen.getByText("Sign In").closest("form");
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("clears validation errors when user starts typing", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    await waitFor(() => {
      expect(
        screen.queryByText("Username is required")
      ).not.toBeInTheDocument();
    });
  });

  it("successfully logs in with admin credentials", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("admin", "admin123");
      expect(mockOnLoginSuccess).toHaveBeenCalled();
    });
  });

  it("successfully logs in with user credentials", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "user123" } });

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("user", "user123");
      expect(mockOnLoginSuccess).toHaveBeenCalled();
    });
  });

  it("shows error for invalid credentials", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "invalid" } });
    fireEvent.change(passwordInput, { target: { value: "invalid" } });

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(
      () => {
        expect(
          screen.getByText("Invalid username or password")
        ).toBeInTheDocument();
        expect(mockLogin).not.toHaveBeenCalled();
        expect(mockOnLoginSuccess).not.toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it("shows loading state during login", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    fireEvent.click(screen.getByText("Sign In"));

    expect(screen.getByText("Signing In...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });
  });

  it("disables form fields during loading", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    fireEvent.click(screen.getByText("Sign In"));

    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();

    await waitFor(() => {
      expect(usernameInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
    });
  });

  it("clears login error when user starts typing", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "invalid" } });
    fireEvent.change(passwordInput, { target: { value: "invalid" } });

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(
      () => {
        expect(
          screen.getByText("Invalid username or password")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    fireEvent.change(usernameInput, { target: { value: "newuser" } });

    await waitFor(() => {
      expect(
        screen.queryByText("Invalid username or password")
      ).not.toBeInTheDocument();
    });
  });

  it("clears login error when user types in password field after error", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "invalid" } });
    fireEvent.change(passwordInput, { target: { value: "invalid" } });

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(
      () => {
        expect(
          screen.getByText("Invalid username or password")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    fireEvent.change(passwordInput, { target: { value: "newpassword" } });

    await waitFor(() => {
      expect(
        screen.queryByText("Invalid username or password")
      ).not.toBeInTheDocument();
    });
  });

  it("handles login error during authentication", async () => {
    const mockLoginWithError = jest.fn().mockImplementation(() => {
      throw new Error("Authentication error");
    });

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      login: mockLoginWithError,
    });

    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(
      () => {
        expect(
          screen.getByText("An error occurred during login")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("clears login error when user types in any field", async () => {
    renderWithTheme(<LoginForm {...baseProps} />);

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "invalid" } });
    fireEvent.change(passwordInput, { target: { value: "invalid" } });

    fireEvent.click(screen.getByText("Sign In"));

    await waitFor(
      () => {
        expect(
          screen.getByText("Invalid username or password")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    fireEvent.change(usernameInput, { target: { value: "newuser" } });

    await waitFor(() => {
      expect(
        screen.queryByText("Invalid username or password")
      ).not.toBeInTheDocument();
    });
  });
});
