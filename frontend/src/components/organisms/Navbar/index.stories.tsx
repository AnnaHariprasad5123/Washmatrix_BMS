import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./index";

const meta: Meta<typeof Navbar> = {
  title: "Organisms/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  argTypes: {
    onAddBook: {
      action: "addBook",
    },
    onLogout: {
      action: "logout",
    },
    username: {
      control: { type: "text" },
    },
    isAdmin: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    username: "user",
    isAdmin: false,
  },
};

export const AdminUser: Story = {
  args: {
    username: "admin",
    isAdmin: true,
    onAddBook: () => console.log("Add book clicked"),
    onLogout: () => console.log("Logout clicked"),
  },
};

export const RegularUser: Story = {
  args: {
    username: "john_doe",
    isAdmin: false,
    onLogout: () => console.log("Logout clicked"),
  },
};
