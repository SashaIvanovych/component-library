import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Sidebar } from "../components/SidebarMenu/SidebarMenu";
import type {
  MenuItem,
  SidebarProps,
} from "../components/SidebarMenu/SidebarMenu.types";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sidebar navigation component with nested submenus and sliding animation.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const basicItems: MenuItem[] = [
  { id: "1", label: "Home" },
  { id: "2", label: "About" },
  { id: "3", label: "Contact" },
];

const dashboardItems: MenuItem[] = [
  { id: "1", label: "Dashboard", icon: "🏠" },
  { id: "2", label: "Analytics", icon: "📊" },
  {
    id: "3",
    label: "Settings",
    icon: "⚙️",
    children: [
      { id: "3-1", label: "Profile" },
      { id: "3-2", label: "Security" },
    ],
  },
  { id: "4", label: "Logout", icon: "🚪" },
];

const deepItems: MenuItem[] = [
  { id: "1", label: "Level 1 Item" },
  {
    id: "2",
    label: "Level 1 Parent",
    children: [
      { id: "2-1", label: "Level 2 Item" },
      {
        id: "2-2",
        label: "Level 2 Parent",
        children: [
          { id: "2-2-1", label: "Level 3 Item" },
          { id: "2-2-2", label: "Level 3 Item" },
        ],
      },
    ],
  },
];

const SidebarWrapper = (args: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{ padding: "20px", height: "100vh", backgroundColor: "#f9fafb" }}
    >
      <div style={{ maxWidth: "600px" }}>
        <h1>My Application</h1>
        <p>Click the button below to toggle the sidebar menu.</p>

        <button
          onClick={() => setIsOpen(true)}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            fontWeight: 500,
          }}
        >
          ☰ Open Sidebar
        </button>
      </div>

      <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  args: {
    items: basicItems,
    isOpen: false,
    onClose: () => {},
  },
  render: SidebarWrapper,
  parameters: {
    docs: {
      source: {
        code: `
const [isOpen, setIsOpen] = useState(false);

<Sidebar 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)} 
  items={basicItems} 
/>`,
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    items: dashboardItems,
    isOpen: false,
    onClose: () => {},
  },
  render: SidebarWrapper,
  parameters: {
    docs: {
      source: {
        code: `
const items = [
  { id: "1", label: "Dashboard", icon: "🏠" },
  { 
    id: "3", 
    label: "Settings", 
    icon: "⚙️",
    children: [...] 
  }
];

<Sidebar isOpen={isOpen} onClose={close} items={items} />`,
      },
    },
  },
};

export const DeepNesting: Story = {
  args: {
    items: deepItems,
    isOpen: false,
    onClose: () => {},
  },
  render: SidebarWrapper,
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates multilevel nesting (Level 1 -> Level 2 -> Level 3).",
      },
    },
  },
};
