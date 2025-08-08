import type { Meta, StoryObj } from "@storybook/react";
import BookForm from "./index";

const meta: Meta<typeof BookForm> = {
  title: "Organisms/EditBook",
  component: BookForm,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: { type: "boolean" },
    },
    mode: {
      control: { type: "select" },
      options: ["create", "edit"],
    },
    bookId: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookForm>;

export const CreateMode: Story = {
  args: {
    open: true,
    mode: "create",
    onClose: () => console.log("Close clicked"),
    onSuccess: () => console.log("Success"),
  },
};

export const EditMode: Story = {
  args: {
    open: true,
    mode: "edit",
    bookId: "1",
    initialData: {
      title: "Sample Book",
      author: "Sample Author",
      year_published: 2023,
      description: "This is a sample book description.",
    },
    onClose: () => console.log("Close clicked"),
    onSuccess: () => console.log("Success"),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    mode: "create",
    onClose: () => console.log("Close clicked"),
    onSuccess: () => console.log("Success"),
  },
};
