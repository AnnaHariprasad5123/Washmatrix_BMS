import * as React from "react";
import { type FC, memo } from "react";
import { Box, styled } from "@mui/material";
import BookCard from "../../molecules/BookCard";
import type { BookListProps } from "../../../utils/interfaces";

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
}));

const BookGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(4),
  justifyContent: "flex-start",
}));

const BookList: FC<BookListProps> = memo(
  ({ books, onView, onEdit, onDelete, isAdmin = false }) => {
    return (
      <StyledContainer>
        <BookGrid>
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              year_published={book.year_published}
              onView={() => onView?.(book.id)}
              onEdit={() => onEdit?.(book.id)}
              onDelete={() => onDelete?.(book.id)}
              isAdmin={isAdmin}
            />
          ))}
        </BookGrid>
      </StyledContainer>
    );
  }
);

export default BookList;
