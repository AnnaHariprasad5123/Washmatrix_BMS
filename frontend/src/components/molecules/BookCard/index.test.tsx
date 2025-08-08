import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import BookCard from "./index";

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

const BOOK_CARD_CONSTANTS = {
  VIEW_BUTTON: "View",
  EDIT_BUTTON: "Edit",
  DELETE_BUTTON: "Delete",
  AUTHOR_PREFIX: "by",
};

describe("BookCard", () => {
  const baseProps = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year_published: 1925,
    onView: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("renders book title, author, and year", () => {
    renderWithTheme(<BookCard {...baseProps} />);
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${BOOK_CARD_CONSTANTS.AUTHOR_PREFIX} ${baseProps.author}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(baseProps.year_published)).toBeInTheDocument();
  });

  it("renders only view button when isAdmin is false", () => {
    renderWithTheme(<BookCard {...baseProps} isAdmin={false} />);
    expect(
      screen.getByText(BOOK_CARD_CONSTANTS.VIEW_BUTTON)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(BOOK_CARD_CONSTANTS.EDIT_BUTTON)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(BOOK_CARD_CONSTANTS.DELETE_BUTTON)
    ).not.toBeInTheDocument();
  });

  it("renders view, edit, and delete buttons when isAdmin is true", () => {
    renderWithTheme(<BookCard {...baseProps} isAdmin={true} />);
    expect(
      screen.getByText(BOOK_CARD_CONSTANTS.VIEW_BUTTON)
    ).toBeInTheDocument();
    expect(
      screen.getByText(BOOK_CARD_CONSTANTS.EDIT_BUTTON)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(BOOK_CARD_CONSTANTS.DELETE_BUTTON)
    ).toBeInTheDocument();
  });

  it("calls correct handlers on click", () => {
    renderWithTheme(<BookCard {...baseProps} isAdmin={true} />);
    fireEvent.click(screen.getByText(BOOK_CARD_CONSTANTS.VIEW_BUTTON));
    fireEvent.click(screen.getByText(BOOK_CARD_CONSTANTS.EDIT_BUTTON));
    fireEvent.click(screen.getByAltText(BOOK_CARD_CONSTANTS.DELETE_BUTTON));
    expect(baseProps.onView).toHaveBeenCalled();
    expect(baseProps.onEdit).toHaveBeenCalled();
    expect(baseProps.onDelete).toHaveBeenCalled();
  });
});
