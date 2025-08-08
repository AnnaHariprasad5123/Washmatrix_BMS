import type { Meta, StoryObj } from "@storybook/react";
import CustomIcon from "./index";
import bookBlueIcon from "../../../assets/icons/svg/bookBlue.svg";
import profileIcon from "../../../assets/icons/svg/profile.svg";
import calendarIcon from "../../../assets/icons/svg/calendar.svg";

const meta: Meta<typeof CustomIcon> = {
  title: "Atoms/Icon",
  component: CustomIcon,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: { type: "text" },
    },
    alt: {
      control: { type: "text" },
    },
    className: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomIcon>;

export const BookIcon: Story = {
  args: {
    src: bookBlueIcon,
    alt: "Book Icon",
    style: { width: "24px", height: "24px" },
  },
};

export const ProfileIcon: Story = {
  args: {
    src: profileIcon,
    alt: "Profile Icon",
    style: { width: "20px", height: "20px" },
  },
};

export const CalendarIcon: Story = {
  args: {
    src: calendarIcon,
    alt: "Calendar Icon",
    style: { width: "16px", height: "16px" },
  },
};
