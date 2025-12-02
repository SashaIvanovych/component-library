import React, { useState } from "react";
import { type InputProps } from "./Input.types";
import styles from "./Input.module.scss";

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value: controlledValue,
  onChange,
  clearable = false,
  disabled = false,
  label,
  error,
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isPassword = type === "password";
  const actualType = isPassword && showPassword ? "text" : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue("");
    }

    if (onChange) {
      onChange("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.inputLabel}>{label}</label>}

      <div
        className={`${styles.inputContainer} ${
          error ? `${styles.hasError}` : ""
        } ${disabled ? `${styles.disabled}` : ""}`}
      >
        <input
          type={actualType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.inputField}
        />

        <div className={styles.inputActions}>
          {isPassword && value && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.iconButton}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="1"
                    y1="1"
                    x2="23"
                    y2="23"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                </svg>
              )}
            </button>
          )}

          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.iconButton}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {error && <span className={styles.inputError}>{error}</span>}
    </div>
  );
};
