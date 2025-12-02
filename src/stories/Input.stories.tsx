import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "../components/Input/Input";
import type { InputProps } from "../components/Input/Input.types";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "tel", "email"],
    },
    clearable: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputWithState = (args: InputProps) => {
  const [value, setValue] = useState(args.value ?? "");
  return <Input {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    label: "Default Input",
    value: "",
  },
  render: InputWithState,
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    value: "secret123",
    clearable: true,
  },
  render: InputWithState,
};

export const Clearable: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search...",
    value: "Some text to clear",
    clearable: true,
  },
  render: InputWithState,
};

export const TelInput: Story = {
  args: {
    label: "Phone",
    type: "tel",
    placeholder: "+380...",
    value: "+380",
    clearable: true,
  },
  render: InputWithState,
};

export const EmailInput: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    clearable: true,
  },
  render: InputWithState,
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    value: "invalid-email",
    error: "Please enter a valid email address",
    clearable: true,
  },
  render: InputWithState,
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
    value: "Read-only value",
  },
  render: InputWithState,
};
