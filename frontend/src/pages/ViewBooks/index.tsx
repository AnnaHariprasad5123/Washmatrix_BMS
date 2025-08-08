import * as React from "react";
import { type FC, useState, useMemo, useCallback, Suspense, lazy } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, CircularProgress, Box, styled } from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import { getBooks, deleteBook } from "../../service";
import { useNavigate } from "react-router-dom";
import { VIEW_BOOKS_CONSTANTS, ROUTES } from "../../utils/constants";
import type { Book } from "../../utils/interfaces";

const BookShelfTemplate = lazy(
  () => import("../../components/templates/BookShelf")
);
const BookList = lazy(() => import("../../components/organisms/BookList"));
const BookForm = lazy(() => import("../../components/organisms/BookModelForm"));

const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

const StyledLoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "25rem",
});

const StyledErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ViewBooks: FC = () => {
  const queryClient = useQueryClient();
  const { isAdmin } = useAuthStore();
  const isUserAdmin = isAdmin();
  const navigate = useNavigate();

  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [bookFormMode, setBookFormMode] = useState<"create" | "edit">("create");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error deleting book:", error);
      alert(VIEW_BOOKS_CONSTANTS.DELETE_ERROR);
    },
  });

  const handleAddBook = useCallback(() => {
    setBookFormMode("create");
    setSelectedBook(null);
    setBookFormOpen(true);
  }, []);

  const handleView = useCallback(
    (bookId: string) => {
      navigate(`${ROUTES.BOOK_DETAILS.replace(":id", bookId)}`);
    },
    [navigate]
  );

  const handleEdit = useCallback(
    (bookId: string) => {
      const book = books.find((book) => book.id === parseInt(bookId));
      if (book) {
        setSelectedBook(book);
        setBookFormMode("edit");
        setBookFormOpen(true);
      }
    },
    [books]
  );

  const handleDelete = useCallback(
    (bookId: string) => {
      const book = books.find((book) => book.id === parseInt(bookId));
      const bookTitle = book?.title || VIEW_BOOKS_CONSTANTS.UNKNOWN_BOOK;

      if (
        window.confirm(
          `${VIEW_BOOKS_CONSTANTS.DELETE_CONFIRMATION} "${bookTitle}"?`
        )
      ) {
        deleteMutation.mutate(parseInt(bookId));
      }
    },
    [books, deleteMutation]
  );

  const handleBookFormClose = useCallback(() => {
    setBookFormOpen(false);
    setSelectedBook(null);
  }, []);

  const handleBookFormSuccess = useCallback(() => {
    console.log(
      `Book ${
        bookFormMode === "create"
          ? VIEW_BOOKS_CONSTANTS.BOOK_CREATED_SUCCESS
          : VIEW_BOOKS_CONSTANTS.BOOK_UPDATED_SUCCESS
      }`
    );
  }, [bookFormMode]);

  const transformedBooks = useMemo(
    () =>
      books.map((book) => ({
        ...book,
        id: book.id.toString(),
      })),
    [books]
  );

  if (isLoading) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <BookShelfTemplate onAddBook={handleAddBook}>
          <StyledLoadingContainer>
            <CircularProgress />
          </StyledLoadingContainer>
        </BookShelfTemplate>
      </Suspense>
    );
  }

  if (error) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <BookShelfTemplate onAddBook={handleAddBook}>
          <StyledErrorContainer>
            <Alert severity="error">{VIEW_BOOKS_CONSTANTS.ERROR_MESSAGE}</Alert>
          </StyledErrorContainer>
        </BookShelfTemplate>
      </Suspense>
    );
  }

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <BookShelfTemplate onAddBook={handleAddBook}>
          <Suspense fallback={<LoadingFallback />}>
            <BookList
              books={transformedBooks}
              onView={handleView}
              onEdit={isUserAdmin ? handleEdit : undefined}
              onDelete={isUserAdmin ? handleDelete : undefined}
              isAdmin={isUserAdmin}
            />
          </Suspense>
        </BookShelfTemplate>
      </Suspense>

      {bookFormOpen && (
        <Suspense fallback={<LoadingFallback />}>
          <BookForm
            open={bookFormOpen}
            mode={bookFormMode}
            bookId={selectedBook?.id.toString()}
            initialData={selectedBook || undefined}
            onClose={handleBookFormClose}
            onSuccess={handleBookFormSuccess}
          />
        </Suspense>
      )}
    </>
  );
};

export default ViewBooks;
