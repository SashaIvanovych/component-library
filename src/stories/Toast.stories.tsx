import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast } from "../components/Toast/Toast";
import { type ToastProps } from "../components/Toast/Toast.types";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
    },
    message: { control: "text" },
    duration: { control: "number" },
    showCloseButton: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toast notification component. In Storybook, click the button to trigger the toast animation.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastWrapper = (args: ToastProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "0.5rem 1rem",
          cursor: "pointer",
          backgroundColor: "#f3f4f6",
          border: "1px solid #d1d5db",
          borderRadius: "0.25rem",
          fontWeight: 500,
        }}
      >
        {isOpen ? "Toast is active..." : "Show Toast Notification"}
      </button>

      {isOpen && <Toast {...args} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export const Success: Story = {
  args: {
    type: "success",
    message: "Data saved successfully!",
    duration: 3000,
    showCloseButton: true,
  },
  render: ToastWrapper,
  parameters: {
    docs: {
      source: {
        code: `
<Toast 
  type="success" 
  message="Data saved successfully!" 
  duration={3000} 
  onClose={handleClose} 
/>`,
      },
    },
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "Failed to connect to server.",
    duration: 3000,
    showCloseButton: true,
  },
  render: ToastWrapper,
  parameters: {
    docs: {
      source: {
        code: `
<Toast 
  type="error" 
  message="Failed to connect to server." 
  duration={3000} 
  onClose={handleClose} 
/>`,
      },
    },
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    message: "This action cannot be undone.",
    duration: 4000,
    showCloseButton: true,
  },
  render: ToastWrapper,
  parameters: {
    docs: {
      source: {
        code: `
<Toast 
  type="warning" 
  message="This action cannot be undone." 
  duration={4000} 
  onClose={handleClose} 
/>`,
      },
    },
  },
};

export const Info: Story = {
  args: {
    type: "info",
    message: "New update available.",
    duration: 3000,
    showCloseButton: true,
  },
  render: ToastWrapper,
  parameters: {
    docs: {
      source: {
        code: `
<Toast 
  type="info" 
  message="New update available." 
  duration={3000} 
  onClose={handleClose} 
/>`,
      },
    },
  },
};

export const WithoutCloseButton: Story = {
  args: {
    type: "info",
    message: "I disappear automatically",
    duration: 2000,
    showCloseButton: false,
  },
  render: ToastWrapper,
  parameters: {
    docs: {
      source: {
        code: `
<Toast 
  type="info" 
  message="I disappear automatically" 
  duration={2000} 
  showCloseButton={false}
  onClose={handleClose} 
/>`,
      },
    },
  },
};

export const LongMessage: Story = {
  args: {
    type: "error",
    message:
      "This is a very long error message to demonstrate how the component handles text wrapping when the content exceeds the container width.",
    duration: 5000,
    showCloseButton: true,
  },
  render: ToastWrapper,
  parameters: {
    docs: {
      source: {
        code: `
<Toast 
  type="error" 
  message="This is a very long error message..." 
  duration={5000} 
  onClose={handleClose} 
/>`,
      },
    },
  },
};
