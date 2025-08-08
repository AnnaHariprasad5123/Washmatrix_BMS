import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "../../theme";
import ViewBooks from "./index";
import { useAuthStore } from "../../store/authStore";

jest.mock("../../assets/icons/svg/logo.svg", () => "logo-icon");
jest.mock("../../assets/icons/svg/add.svg", () => "add-icon");
jest.mock("../../assets/icons/svg/profile.svg", () => "profile-icon");
jest.mock("../../assets/icons/svg/logout.svg", () => "logout-icon");
jest.mock("../../assets/icons/svg/calendar.svg", () => "calendar-icon");
jest.mock("../../assets/icons/svg/visibility.svg", () => "visibility-icon");
jest.mock("../../assets/icons/svg/edit.svg", () => "edit-icon");
jest.mock("../../assets/icons/svg/delete.svg", () => "delete-icon");
jest.mock("../../assets/icons/svg/save.svg", () => "save-icon");
jest.mock("../../assets/icons/svg/close.svg", () => "close-icon");

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("../../service", () => ({
  bookApi: {
    getBooks: jest.fn(),
    deleteBook: jest.fn(),
  },
}));

jest.mock("../../store/authStore", () => ({
  useAuthStore: jest.fn(() => ({
    logout: jest.fn(),
    username: "testuser",
    isAdmin: () => false,
  })),
}));

jest.mock("../../utils/constants", () => ({
  VIEW_BOOKS_CONSTANTS: {
    LOADING_MESSAGE: "Loading book details...",
    ERROR_MESSAGE: "Failed to load books. Please try refreshing the page.",
    DELETE_CONFIRMATION: "Are you sure you want to delete",
    DELETE_ERROR: "Failed to delete book. Please try again.",
    UNKNOWN_BOOK: "Unknown Book",
    BOOK_CREATED_SUCCESS: "Book created successfully",
    BOOK_UPDATED_SUCCESS: "Book updated successfully",
  },
  ROUTES: {
    BOOK_DETAILS: "/book/:id",
  },
  NAVBAR_CONSTANTS: {
    APP_TITLE: "BookShelf",
    SUBTITLE: "Management System",
    ADD_BOOK_BUTTON: "Add Book",
    LOGOUT_MENU_ITEM: "Logout",
    ADMIN_SUFFIX: "(Admin)",
    USER_SUFFIX: "(User)",
  },
  BOOK_CARD_CONSTANTS: {
    VIEW_BUTTON: "View",
    EDIT_BUTTON: "Edit",
    DELETE_BUTTON: "Delete",
    AUTHOR_PREFIX: "by",
  },
  BOOK_FORM_CONSTANTS: {
    CREATE_TITLE: "Create New Book",
    EDIT_TITLE: "Edit Book",
    CREATE_BUTTON: "Create Book",
    UPDATE_BUTTON: "Update Book",
    CREATING_BUTTON: "Creating...",
    UPDATING_BUTTON: "Updating...",
    CANCEL_BUTTON: "Cancel",
    TITLE_LABEL: "Title",
    TITLE_PLACEHOLDER: "Enter book title",
    AUTHOR_LABEL: "Author",
    AUTHOR_PLACEHOLDER: "Enter author name",
    PUBLICATION_YEAR_LABEL: "Publication Year",
    PUBLICATION_YEAR_PLACEHOLDER: "Enter publication year",
    DESCRIPTION_LABEL: "Description",
    DESCRIPTION_PLACEHOLDER: "Enter book description",
    TITLE_REQUIRED: "Title is required",
    AUTHOR_REQUIRED: "Author is required",
    YEAR_REQUIRED: "Please enter a valid publication year",
    DESCRIPTION_REQUIRED: "Description is required",
  },
  VALIDATION_CONSTANTS: {
    MIN_YEAR: 1800,
    MAX_YEAR: 2024,
  },
}));

describe("ViewBooks", () => {
  const mockBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year_published: 1925,
      description: "A story of the fabulously wealthy Jay Gatsby.",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year_published: 1960,
      description: "A story of racial injustice in the American South.",
    },
  ];

  const createQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

  const renderWithProviders = (component: React.ReactElement) => {
    const queryClient = createQueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      logout: jest.fn(),
      username: "testuser",
      isAdmin: () => false,
    });
  });

  it("renders loading state initially", () => {
    renderWithProviders(<ViewBooks />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders books when data is loaded", () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(["books"], mockBooks);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ViewBooks />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("To Kill a Mockingbird")).toBeInTheDocument();
    expect(screen.getByText("by F. Scott Fitzgerald")).toBeInTheDocument();
    expect(screen.getByText("by Harper Lee")).toBeInTheDocument();
  });

  it("shows add book button for admin users", () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(["books"], mockBooks);

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      logout: jest.fn(),
      username: "adminuser",
      isAdmin: () => true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ViewBooks />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Add Book")).toBeInTheDocument();
  });

  it("does not show edit and delete buttons for non-admin users", () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(["books"], mockBooks);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ViewBooks />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Delete")).not.toBeInTheDocument();
  });
});
