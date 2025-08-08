import type { Meta, StoryObj } from "@storybook/react";
import BookCard from "./index";

const meta: Meta<typeof BookCard> = {
  title: "Molecules/BookCard",
  component: BookCard,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    author: {
      control: { type: "text" },
    },
    year_published: {
      control: { type: "number" },
    },
    isAdmin: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookCard>;

export const Default: Story = {
  args: {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year_published: 1925,
    isAdmin: false,
  },
};

export const AdminView: Story = {
  args: {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year_published: 1960,
    isAdmin: true,
    onView: () => console.log("View clicked"),
    onEdit: () => console.log("Edit clicked"),
    onDelete: () => console.log("Delete clicked"),
  },
};

export const LongTitle: Story = {
  args: {
    title: "The Very Long Book Title That Might Overflow",
    author: "Author Name",
    year_published: 2023,
    isAdmin: false,
  },
};
