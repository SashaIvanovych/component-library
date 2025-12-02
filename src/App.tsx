import { useState } from "react";
import "./App.scss";
import { Input } from "./components/Input/Input";
import { Toast } from "./components/Toast/Toast";
import { type ToastProps } from "./components/Toast/Toast.types";
import { Sidebar } from "./components/SidebarMenu/SidebarMenu";
import { type MenuItem } from "./components/SidebarMenu/SidebarMenu.types";

const menuItems: MenuItem[] = [
  { id: "1", label: "Dashboard", icon: "🏠" },
  { id: "2", label: "Analytics", icon: "📊" },
  {
    id: "3",
    label: "Settings",
    icon: "⚙️",
    children: [
      { id: "3-1", label: "Profile" },
      { id: "3-2", label: "Security" },
      { id: "3-3", label: "Notifications" },
    ],
  },
  { id: "4", label: "Logout", icon: "🚪" },
];

function App() {
  const [activeToast, setActiveToast] = useState<ToastProps | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleShowToast = () => {
    setActiveToast({
      message: "Data saved successfully!",
      type: "success",
      duration: 3000,
    });
  };

  const handleCloseToast = () => {
    setActiveToast(null);
  };

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={menuItems}
      />

      <div className="app-container">
        <h1>Test Components</h1>

        <div className="section">
          <button
            className="btn btn-outline"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰ Open Sidebar Menu
          </button>
        </div>

        <div className="section bordered">
          <button className="btn btn-primary" onClick={handleShowToast}>
            Show Success Toast
          </button>

          <form className="demo-form" onSubmit={(e) => e.preventDefault()}>
            <Input
              clearable
              type="tel"
              label="Phone Number"
              placeholder="+380..."
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
          </form>
        </div>
      </div>

      {activeToast && (
        <Toast
          message={activeToast.message}
          type={activeToast.type}
          duration={activeToast.duration}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}

export default App;
