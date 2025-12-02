export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}
