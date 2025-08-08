import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "../../../theme";
import BookModelForm from "./index";
import { createBook, updateBook } from "../../../service";

jest.mock("../../../assets/icons/svg/save.svg", () => "save-icon");
jest.mock("../../../assets/icons/svg/close.svg", () => "close-icon");

jest.mock("../../../service", () => ({
  createBook: jest.fn(),
  updateBook: jest.fn(),
}));

jest.mock("../../../utils/constants", () => ({
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

describe("BookModelForm", () => {
  const baseProps = {
    open: true,
    mode: "create" as const,
    onClose: jest.fn(),
    onSuccess: jest.fn(),
  };

  const mockInitialData = {
    title: "Test Book",
    author: "Test Author",
    year_published: 2020,
    description: "Test description",
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create form when mode is create", () => {
    renderWithProviders(<BookModelForm {...baseProps} />);

    expect(screen.getByText("Create New Book")).toBeInTheDocument();
    expect(screen.getByText("Create Book")).toBeInTheDocument();
  });

  it("renders edit form when mode is edit", () => {
    renderWithProviders(
      <BookModelForm {...baseProps} mode="edit" bookId="1" />
    );

    expect(screen.getByText("Edit Book")).toBeInTheDocument();
    expect(screen.getByText("Update Book")).toBeInTheDocument();
  });

  it("populates form with initial data", () => {
    renderWithProviders(
      <BookModelForm {...baseProps} initialData={mockInitialData} />
    );

    expect(screen.getByDisplayValue("Test Book")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Author")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2020")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test description")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    renderWithProviders(<BookModelForm {...baseProps} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(baseProps.onClose).toHaveBeenCalled();
  });

  it("shows validation errors for empty fields", async () => {
    renderWithProviders(<BookModelForm {...baseProps} />);

    fireEvent.click(screen.getByText("Create Book"));

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Author is required")).toBeInTheDocument();
      expect(
        screen.getByText("Please enter a valid publication year")
      ).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });
  });

  it("clears validation errors when user starts typing", async () => {
    renderWithProviders(<BookModelForm {...baseProps} />);

    const titleInput = screen.getByPlaceholderText("Enter book title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    await waitFor(() => {
      expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
    });
  });

  it("does not render when open is false", () => {
    renderWithProviders(<BookModelForm {...baseProps} open={false} />);

    expect(screen.queryByText("Create New Book")).not.toBeInTheDocument();
  });

  it("shows loading state during create", async () => {
    (createBook as jest.Mock).mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<BookModelForm {...baseProps} />);

    const titleInput = screen.getByPlaceholderText("Enter book title");
    const authorInput = screen.getByPlaceholderText("Enter author name");
    const yearInput = screen.getByPlaceholderText("Enter publication year");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );

    fireEvent.change(titleInput, { target: { value: "Test Book" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(yearInput, { target: { value: "2020" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    fireEvent.click(screen.getByText("Create Book"));

    expect(screen.getByText("Creating...")).toBeInTheDocument();
  });

  it("shows loading state during update", async () => {
    (updateBook as jest.Mock).mockImplementation(() => new Promise(() => {}));

    renderWithProviders(
      <BookModelForm {...baseProps} mode="edit" bookId="1" />
    );

    const titleInput = screen.getByPlaceholderText("Enter book title");
    const authorInput = screen.getByPlaceholderText("Enter author name");
    const yearInput = screen.getByPlaceholderText("Enter publication year");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );

    fireEvent.change(titleInput, { target: { value: "Updated Book" } });
    fireEvent.change(authorInput, { target: { value: "Updated Author" } });
    fireEvent.change(yearInput, { target: { value: "2021" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated description" },
    });

    fireEvent.click(screen.getByText("Update Book"));

    expect(screen.getByText("Updating...")).toBeInTheDocument();
  });

  it("handles create mutation error", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (createBook as jest.Mock).mockRejectedValue(new Error("Create failed"));

    renderWithProviders(<BookModelForm {...baseProps} />);

    const titleInput = screen.getByPlaceholderText("Enter book title");
    const authorInput = screen.getByPlaceholderText("Enter author name");
    const yearInput = screen.getByPlaceholderText("Enter publication year");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );

    fireEvent.change(titleInput, { target: { value: "Test Book" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(yearInput, { target: { value: "2020" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    fireEvent.click(screen.getByText("Create Book"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error creating book:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("handles update mutation error", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (updateBook as jest.Mock).mockRejectedValue(new Error("Update failed"));

    renderWithProviders(
      <BookModelForm {...baseProps} mode="edit" bookId="1" />
    );

    const titleInput = screen.getByPlaceholderText("Enter book title");
    const authorInput = screen.getByPlaceholderText("Enter author name");
    const yearInput = screen.getByPlaceholderText("Enter publication year");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );

    fireEvent.change(titleInput, { target: { value: "Updated Book" } });
    fireEvent.change(authorInput, { target: { value: "Updated Author" } });
    fireEvent.change(yearInput, { target: { value: "2021" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated description" },
    });

    fireEvent.click(screen.getByText("Update Book"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error updating book:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("shows error message when create mutation fails", async () => {
    (createBook as jest.Mock).mockRejectedValue(new Error("Create failed"));

    renderWithProviders(<BookModelForm {...baseProps} />);

    const titleInput = screen.getByPlaceholderText("Enter book title");
    const authorInput = screen.getByPlaceholderText("Enter author name");
    const yearInput = screen.getByPlaceholderText("Enter publication year");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );

    fireEvent.change(titleInput, { target: { value: "Test Book" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(yearInput, { target: { value: "2020" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    fireEvent.click(screen.getByText("Create Book"));

    await waitFor(() => {
      expect(
        screen.getByText("Failed to create book. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("shows error message when update mutation fails", async () => {
    (updateBook as jest.Mock).mockRejectedValue(new Error("Update failed"));

    renderWithProviders(
      <BookModelForm {...baseProps} mode="edit" bookId="1" />
    );

    const titleInput = screen.getByPlaceholderText("Enter book title");
    const authorInput = screen.getByPlaceholderText("Enter author name");
    const yearInput = screen.getByPlaceholderText("Enter publication year");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );

    fireEvent.change(titleInput, { target: { value: "Updated Book" } });
    fireEvent.change(authorInput, { target: { value: "Updated Author" } });
    fireEvent.change(yearInput, { target: { value: "2021" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated description" },
    });

    fireEvent.click(screen.getByText("Update Book"));

    await waitFor(() => {
      expect(
        screen.getByText("Failed to edit book. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("calls onSuccess and onClose when create mutation succeeds", async () => {
    (createBook as jest.Mock).mockResolvedValue({ id: 1 });

    renderWithProviders(<BookModelForm {...baseProps} />);

    const titleInput = screen.getByPlaceholderText("Enter book title");
    const authorInput = screen.getByPlaceholderText("Enter author name");
    const yearInput = screen.getByPlaceholderText("Enter publication year");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );

    fireEvent.change(titleInput, { target: { value: "Test Book" } });
    fireEvent.change(authorInput, { target: { value: "Test Author" } });
    fireEvent.change(yearInput, { target: { value: "2020" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    fireEvent.click(screen.getByText("Create Book"));

    await waitFor(() => {
      expect(baseProps.onSuccess).toHaveBeenCalled();
      expect(baseProps.onClose).toHaveBeenCalled();
    });
  });

  it("calls onSuccess and onClose when update mutation succeeds", async () => {
    (updateBook as jest.Mock).mockResolvedValue({ id: 1 });

    renderWithProviders(
      <BookModelForm {...baseProps} mode="edit" bookId="1" />
    );

    const titleInput = screen.getByPlaceholderText("Enter book title");
    const authorInput = screen.getByPlaceholderText("Enter author name");
    const yearInput = screen.getByPlaceholderText("Enter publication year");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );

    fireEvent.change(titleInput, { target: { value: "Updated Book" } });
    fireEvent.change(authorInput, { target: { value: "Updated Author" } });
    fireEvent.change(yearInput, { target: { value: "2021" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated description" },
    });

    fireEvent.click(screen.getByText("Update Book"));

    await waitFor(() => {
      expect(baseProps.onSuccess).toHaveBeenCalled();
      expect(baseProps.onClose).toHaveBeenCalled();
    });
  });

  it("clears errors when user starts typing in any field", async () => {
    renderWithProviders(<BookModelForm {...baseProps} />);

    fireEvent.click(screen.getByText("Create Book"));

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
      expect(screen.getByText("Author is required")).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText("Enter book title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    await waitFor(() => {
      expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
    });

    const authorInput = screen.getByPlaceholderText("Enter author name");
    fireEvent.change(authorInput, { target: { value: "New Author" } });

    await waitFor(() => {
      expect(screen.queryByText("Author is required")).not.toBeInTheDocument();
    });

    const yearInput = screen.getByPlaceholderText("Enter publication year");
    fireEvent.change(yearInput, { target: { value: "2020" } });

    await waitFor(() => {
      expect(
        screen.queryByText("Please enter a valid publication year")
      ).not.toBeInTheDocument();
    });

    const descriptionInput = screen.getByPlaceholderText(
      "Enter book description"
    );
    fireEvent.change(descriptionInput, {
      target: { value: "New description" },
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Description is required")
      ).not.toBeInTheDocument();
    });
  });

  it("handles invalid year input correctly", async () => {
    renderWithProviders(<BookModelForm {...baseProps} />);

    const yearInput = screen.getByPlaceholderText("Enter publication year");

    fireEvent.change(yearInput, { target: { value: "invalid" } });

    expect(yearInput).toHaveValue(0);
  });
});
