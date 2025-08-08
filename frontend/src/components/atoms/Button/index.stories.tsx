import type { Meta, StoryObj } from "@storybook/react";
import CustomButton from "./index";

const meta: Meta<typeof CustomButton> = {
  title: "Atoms/Button",
  component: CustomButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["contained", "outlined", "text"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "info", "success", "warning"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

export const contained: Story = {
  args: {
    children: "Contained",
    variant: "contained",
    color: "primary",
  },
};

export const Outlined: Story = {
  args: {
    children: "Outlined",
    variant: "outlined",
    color: "secondary",
  },
};

export const Text: Story = {
  args: {
    children: "Text",
    variant: "text",
    color: "primary",
  },
};
