import React, { useEffect, useState } from "react";
import { type ToastProps } from "./Toast.types";
import { getToastIcon } from "../helpers/toastHealpers";
import styles from "./Toast.module.scss";

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  showCloseButton = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    if (duration > 0) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300);
      }, duration);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }

    return () => clearTimeout(showTimer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.content}>
        <div className={styles.icon}>{getToastIcon(type)}</div>
        <div className={styles.message}>{message}</div>
      </div>

      {showCloseButton && (
        <button onClick={handleClose} className={styles.close}>
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
  );
};
