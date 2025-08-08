import type { Meta, StoryObj } from "@storybook/react";
import CustomTypography from "./index";

const meta: Meta<typeof CustomTypography> = {
  title: "Atoms/Typography",
  component: CustomTypography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body1",
        "body2",
        "subtitle1",
        "subtitle2",
        "caption",
        "overline",
      ],
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
        "textPrimary",
        "textSecondary",
      ],
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
    },
    gutterBottom: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomTypography>;

export const Heading: Story = {
  args: {
    children: "This is a Heading",
    variant: "h1",
    color: "primary",
  },
};

export const Body: Story = {
  args: {
    children:
      "This is body text with some content to demonstrate the typography component.",
    variant: "body1",
    color: "textPrimary",
  },
};

export const Caption: Story = {
  args: {
    children: "This is a caption text",
    variant: "caption",
    color: "textSecondary",
  },
};
