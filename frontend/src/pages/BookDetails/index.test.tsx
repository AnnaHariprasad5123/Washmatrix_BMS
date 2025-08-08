import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "../../theme";
import BookDetails from "./index";

jest.mock("../../assets/icons/svg/profile.svg", () => "profile-icon");
jest.mock("../../assets/icons/svg/calendar.svg", () => "calendar-icon");
jest.mock("../../assets/icons/svg/bookBlue.svg", () => "book-blue-icon");
jest.mock("../../assets/icons/svg/logo.svg", () => "logo-icon");
jest.mock("../../assets/icons/svg/add.svg", () => "add-icon");
jest.mock("../../assets/icons/svg/logout.svg", () => "logout-icon");

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../service", () => ({
  bookApi: {
    getBook: jest.fn(),
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
  BOOK_DETAILS_CONSTANTS: {
    BACK_TO_BOOKS: "Back to Books",
    PUBLICATION_YEAR_LABEL: "Publication Year:",
    DESCRIPTION_HEADER: "Description",
    LOADING_MESSAGE: "Loading book details...",
    ERROR_MESSAGE: "Failed to load book details. Please try again.",
  },
  ROUTES: {
    BOOKS: "/books",
  },
  NAVBAR_CONSTANTS: {
    APP_TITLE: "BookShelf",
    SUBTITLE: "Management System",
    ADD_BOOK_BUTTON: "Add Book",
    LOGOUT_MENU_ITEM: "Logout",
    ADMIN_SUFFIX: "(Admin)",
    USER_SUFFIX: "(User)",
  },
}));

describe("BookDetails", () => {
  const mockBook = {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year_published: 1925,
    description:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
  };

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

  it("renders loading state initially", () => {
    renderWithProviders(<BookDetails />);

    expect(screen.getByText("Loading book details...")).toBeInTheDocument();
  });

  it("renders book details when data is loaded", async () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(["book", "1"], mockBook);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BookDetails />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("by F. Scott Fitzgerald")).toBeInTheDocument();
    expect(screen.getByText("1925")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan."
      )
    ).toBeInTheDocument();
  });

  it("renders back button", async () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(["book", "1"], mockBook);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BookDetails />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Back to Books")).toBeInTheDocument();
  });

  it("renders error message when book is not found", async () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(["book", "1"], null);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BookDetails />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(
      screen.getByText("Failed to load book details. Please try again.")
    ).toBeInTheDocument();
  });

  it("displays publication year with label", async () => {
    const queryClient = createQueryClient();
    queryClient.setQueryData(["book", "1"], mockBook);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BookDetails />
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Publication Year:")).toBeInTheDocument();
    expect(screen.getByText("1925")).toBeInTheDocument();
  });
});
