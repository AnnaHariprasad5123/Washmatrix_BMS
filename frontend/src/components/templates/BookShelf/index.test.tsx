import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import BookShelfTemplate from "./index";
import { useAuthStore } from "../../../store/authStore";

jest.mock("../../../assets/icons/svg/logo.svg", () => "logo-icon");
jest.mock("../../../assets/icons/svg/add.svg", () => "add-icon");
jest.mock("../../../assets/icons/svg/profile.svg", () => "profile-icon");
jest.mock("../../../assets/icons/svg/logout.svg", () => "logout-icon");

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("../../../store/authStore", () => ({
  useAuthStore: jest.fn(),
}));

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

describe("BookShelfTemplate", () => {
  const mockLogout = jest.fn();
  const mockOnAddBook = jest.fn();

  const baseProps = {
    children: <div data-testid="test-content">Test Content</div>,
    onAddBook: mockOnAddBook,
  };

  const renderWithProviders = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      logout: mockLogout,
      username: "testuser",
      isAdmin: () => false,
    });
  });

  it("renders template with children content", () => {
    renderWithProviders(<BookShelfTemplate {...baseProps} />);

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders navbar with correct props", () => {
    renderWithProviders(<BookShelfTemplate {...baseProps} />);

    expect(screen.getByText("BookShelf")).toBeInTheDocument();
    expect(screen.getByText("Management System")).toBeInTheDocument();
    expect(screen.getByText("testuser (User)")).toBeInTheDocument();
  });

  it("shows admin navbar when user is admin", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      logout: mockLogout,
      username: "adminuser",
      isAdmin: () => true,
    });

    renderWithProviders(<BookShelfTemplate {...baseProps} />);

    expect(screen.getByText("Add Book")).toBeInTheDocument();
    expect(screen.getByText("adminuser (Admin)")).toBeInTheDocument();
  });

  it("does not show add book button when user is not admin", () => {
    renderWithProviders(<BookShelfTemplate {...baseProps} />);

    expect(screen.queryByText("Add Book")).not.toBeInTheDocument();
  });

  it("calls onAddBook when add book button is clicked", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      logout: mockLogout,
      username: "adminuser",
      isAdmin: () => true,
    });

    renderWithProviders(<BookShelfTemplate {...baseProps} />);

    fireEvent.click(screen.getByText("Add Book"));

    expect(mockOnAddBook).toHaveBeenCalled();
  });

  it("handles logout and navigation", () => {
    renderWithProviders(<BookShelfTemplate {...baseProps} />);

    const userSection = screen.getByText("testuser (User)").closest("div");
    fireEvent.click(userSection!);

    fireEvent.click(screen.getByText("Logout"));

    expect(mockLogout).toHaveBeenCalled();
  });

  it("displays empty username when username is null", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      logout: mockLogout,
      username: null,
      isAdmin: () => false,
    });

    renderWithProviders(<BookShelfTemplate {...baseProps} />);

    expect(screen.getByText("(User)")).toBeInTheDocument();
  });

  it("works without onAddBook prop", () => {
    renderWithProviders(
      <BookShelfTemplate
        children={<div data-testid="test-content">Test Content</div>}
      />
    );

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByText("BookShelf")).toBeInTheDocument();
  });
});
