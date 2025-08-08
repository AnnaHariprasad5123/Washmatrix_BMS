import { type BookListItem } from "./interfaces";

export const ADMIN_USERNAME = "hari";
export const ADMIN_PASSWORD = "admin123";
export const USER_USERNAME = "joyboy";
export const USER_PASSWORD = "user123";

export const LOGIN_CONSTANTS = {
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
};

export const NAVBAR_CONSTANTS = {
  APP_TITLE: "BookShelf",
  SUBTITLE: "Management System",
  ADD_BOOK_BUTTON: "Add Book",
  LOGOUT_MENU_ITEM: "Logout",
  ADMIN_SUFFIX: "(Admin)",
  USER_SUFFIX: "(User)",
};

export const BOOK_FORM_CONSTANTS = {
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
  CREATE_ERROR: "Failed to create book. Please try again.",
  UPDATE_ERROR: "Failed to update book. Please try again.",
  EDIT_ERROR: "Failed to edit book. Please try again.",
};

export const BOOK_CARD_CONSTANTS = {
  VIEW_BUTTON: "View",
  EDIT_BUTTON: "Edit",
  DELETE_BUTTON: "Delete",
  AUTHOR_PREFIX: "by",
};

export const VIEW_BOOKS_CONSTANTS = {
  LOADING_MESSAGE: "Loading book details...",
  ERROR_MESSAGE: "Failed to load books. Please try refreshing the page.",
  DELETE_CONFIRMATION: "Are you sure you want to delete",
  DELETE_ERROR: "Failed to delete book. Please try again.",
  UNKNOWN_BOOK: "Unknown Book",
  BOOK_CREATED_SUCCESS: "Book created successfully",
  BOOK_UPDATED_SUCCESS: "Book updated successfully",
};

export const BOOK_DETAILS_CONSTANTS = {
  BACK_TO_BOOKS: "Back to Books",
  PUBLICATION_YEAR_LABEL: "Publication Year:",
  DESCRIPTION_HEADER: "Description",
  LOADING_MESSAGE: "Loading book details...",
  ERROR_MESSAGE: "Failed to load book details. Please try again.",
};

export const NOT_FOUND_CONSTANTS = {
  TITLE: "404 - Page Not Found",
  SUBTITLE: "Oops! The page you're looking for doesn't exist.",
  DESCRIPTION:
    "The page you are trying to access might have been moved, deleted, or you entered the wrong URL.",
  GO_HOME_BUTTON: "Go to Home",
  GO_BACK_BUTTON: "Go Back",
  ERROR_CODE: "404",
};

export const ROUTES = {
  HOME: "/",
  BOOKS: "/books",
  BOOK_DETAILS: "/book/:id",
  NOT_FOUND: "*",
};

export const VALIDATION_CONSTANTS = {
  MIN_YEAR: 1800,
  MAX_YEAR: new Date().getFullYear(),
};

export const DUMMYBOOKS: BookListItem[] = [
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
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    year_published: 1949,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year_published: 1813,
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year_published: 1951,
  },
];
