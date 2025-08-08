import type { Meta, StoryObj } from "@storybook/react";
import BookList from "../../organisms/BookList";
import { Box, styled } from "@mui/material";
import Navbar from "../../organisms/Navbar";
import { DUMMYBOOKS } from "../../../utils/constants";

const MockBookShelfTemplate = ({
  children,
  onAddBook,
  isAdmin = false,
  username = "user",
}: {
  children: React.ReactNode;
  onAddBook?: () => void;
  isAdmin?: boolean;
  username?: string;
}) => {
  const TemplateContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    backgroundColor: theme.customColors.background.default,
  }));

  const ContentSection = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  }));

  return (
    <TemplateContainer>
      <Navbar
        onAddBook={onAddBook}
        onLogout={() => console.log("Logout clicked")}
        username={username}
        isAdmin={isAdmin}
      />
      <ContentSection>{children}</ContentSection>
    </TemplateContainer>
  );
};

const meta: Meta<typeof MockBookShelfTemplate> = {
  title: "Template/BookShelfTemplate",
  component: MockBookShelfTemplate,
  argTypes: {
    onAddBook: {
      action: "addBook",
    },
    isAdmin: {
      control: { type: "boolean" },
    },
    username: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MockBookShelfTemplate>;

export const UserView: Story = {
  args: {
    children: (
      <BookList
        books={DUMMYBOOKS}
        isAdmin={false}
        onView={(bookId) => console.log("View book:", bookId)}
      />
    ),
    onAddBook: () => console.log("Add book clicked"),
    isAdmin: false,
    username: "user",
  },
};

export const AdminView: Story = {
  args: {
    children: (
      <BookList
        books={DUMMYBOOKS}
        isAdmin={true}
        onView={(bookId) => console.log("View book:", bookId)}
        onEdit={(bookId) => console.log("Edit book:", bookId)}
        onDelete={(bookId) => console.log("Delete book:", bookId)}
      />
    ),
    onAddBook: () => console.log("Admin add book clicked"),
    isAdmin: true,
    username: "admin",
  },
};
