import type { Meta, StoryObj } from "@storybook/react";
import { Person, Email, Lock } from "@mui/icons-material";
import FormField from "./index";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  decorators: [(Story) => <Story />],
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label text for the form field",
    },
    error: {
      control: "text",
      description: "Error message to display below the field",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required (adds asterisk)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input field",
    },
    icon: {
      control: false,
      description: "Icon to display at the start of the input field",
    },
    disabled: {
      control: "boolean",
      description: "Whether the field is disabled",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "Size of the input field",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    icon: <Person />,
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    error: "Username is required",
    icon: <Person />,
  },
};

export const EmailField: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email address",
    type: "email",
    icon: <Email />,
  },
};

export const PasswordField: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    icon: <Lock />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    disabled: true,
    icon: <Person />,
  },
};
