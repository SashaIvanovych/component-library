import React, { useState } from "react";
import styles from "./SidebarMenu.module.scss";
import { type MenuItem, type SidebarProps } from "./SidebarMenu.types";

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, items }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className={styles.menuItemWrapper}>
        <div
          className={`
            ${styles.menuItem} 
            ${styles[`level${level}`]} 
            ${hasChildren ? styles.hasChildren : ""}
          `}
          onClick={() => hasChildren && toggleItem(item.id)}
        >
          {item.icon && <span className={styles.menuIcon}>{item.icon}</span>}
          <span className={styles.menuLabel}>{item.label}</span>

          {hasChildren && (
            <svg
              className={`${styles.chevron} ${
                isExpanded ? styles.expanded : ""
              }`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline
                points="9 18 15 12 9 6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {hasChildren && (
          <div
            className={`${styles.submenuWrapper} ${
              isExpanded ? styles.expanded : ""
            }`}
          >
            <div className={styles.submenuInner}>
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isOpen && <div className={styles.sidebarOverlay} onClick={onClose} />}

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2>Menu</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <svg
              width="20"
              height="20"
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
        </div>

        <div className={styles.sidebarContent}>
          {items.map((item) => renderMenuItem(item))}
        </div>
      </div>
    </>
  );
};
