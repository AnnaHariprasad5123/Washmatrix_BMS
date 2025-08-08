import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import BookList from "./index";
import BookCard from "../../molecules/BookCard";

jest.mock("../../../assets/icons/svg/calendar.svg", () => "calendar-icon");
jest.mock("../../../assets/icons/svg/visibility.svg", () => "visibility-icon");
jest.mock("../../../assets/icons/svg/edit.svg", () => "edit-icon");
jest.mock("../../../assets/icons/svg/delete.svg", () => "delete-icon");

jest.mock("../../../utils/constants", () => ({
  BOOK_CARD_CONSTANTS: {
    VIEW_BUTTON: "View",
    EDIT_BUTTON: "Edit",
    DELETE_BUTTON: "Delete",
    AUTHOR_PREFIX: "by",
  },
}));

describe("BookList", () => {
  const mockBooks = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year_published: 1925,
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year_published: 1960,
    },
  ];

  const baseProps = {
    books: mockBooks,
    onView: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("renders all books", () => {
    renderWithTheme(<BookList {...baseProps} />);

    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("To Kill a Mockingbird")).toBeInTheDocument();
    expect(screen.getByText("by F. Scott Fitzgerald")).toBeInTheDocument();
    expect(screen.getByText("by Harper Lee")).toBeInTheDocument();
  });

  it("calls onView with correct book id", () => {
    renderWithTheme(<BookList {...baseProps} />);

    const viewButtons = screen.getAllByText("View");
    fireEvent.click(viewButtons[0]);

    expect(baseProps.onView).toHaveBeenCalledWith("1");
  });

  it("calls onEdit with correct book id when isAdmin is true", () => {
    renderWithTheme(<BookList {...baseProps} isAdmin={true} />);

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(baseProps.onEdit).toHaveBeenCalledWith("1");
  });

  it("calls onDelete with correct book id when isAdmin is true", () => {
    renderWithTheme(<BookList {...baseProps} isAdmin={true} />);

    const deleteButtons = screen.getAllByAltText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(baseProps.onDelete).toHaveBeenCalledWith("1");
  });

  it("does not show edit and delete buttons when isAdmin is false", () => {
    renderWithTheme(<BookList {...baseProps} isAdmin={false} />);

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByAltText("Delete")).not.toBeInTheDocument();
  });

  it("renders empty list when no books provided", () => {
    renderWithTheme(<BookList {...baseProps} books={[]} />);

    expect(screen.queryByText("The Great Gatsby")).not.toBeInTheDocument();
    expect(screen.queryByText("To Kill a Mockingbird")).not.toBeInTheDocument();
  });
});
