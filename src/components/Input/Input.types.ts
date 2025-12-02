export interface InputProps {
  type?: "text" | "password" | "tel" | "email";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  clearable?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
}
