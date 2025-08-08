import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./index";

const meta: Meta<typeof LoginForm> = {
  title: "Organisms/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  argTypes: {
    onLoginSuccess: {
      action: "loginSuccess",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};
