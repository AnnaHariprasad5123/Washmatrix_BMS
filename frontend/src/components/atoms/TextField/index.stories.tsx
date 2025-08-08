import type { Meta, StoryObj } from "@storybook/react";
import CustomTextField from "./index";

const meta: Meta<typeof CustomTextField> = {
  title: "Atoms/TextField",
  component: CustomTextField,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "filled", "standard"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "warning", "info", "success"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    multiline: {
      control: { type: "boolean" },
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "search", "tel", "url"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomTextField>;

export const Default: Story = {
  args: {
    label: "Default Text Field",
    placeholder: "Enter text here",
    variant: "outlined",
    size: "medium",
  },
};

export const WithError: Story = {
  args: {
    label: "Text Field with Error",
    placeholder: "Enter text here",
    variant: "outlined",
    error: true,
    helperText: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Text Field",
    placeholder: "This field is disabled",
    variant: "outlined",
    disabled: true,
    value: "Disabled value",
  },
};
