import type { Meta, StoryObj } from "@storybook/react";
import BookList from "./index";
import type { BookListItem } from "../../../utils/interfaces";

const sampleBooks: BookListItem[] = [
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
];

const meta: Meta<typeof BookList> = {
  title: "Organisms/BookList",
  component: BookList,
  tags: ["autodocs"],
  argTypes: {
    onView: {
      action: "view",
    },
    onEdit: {
      action: "edit",
    },
    onDelete: {
      action: "delete",
    },
    isAdmin: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookList>;

export const Default: Story = {
  args: {
    books: sampleBooks,
    isAdmin: false,
    onView: (bookId) => console.log("View book:", bookId),
  },
};

export const AdminView: Story = {
  args: {
    books: sampleBooks,
    isAdmin: true,
    onView: (bookId) => console.log("View book:", bookId),
    onEdit: (bookId) => console.log("Edit book:", bookId),
    onDelete: (bookId) => console.log("Delete book:", bookId),
  },
};
