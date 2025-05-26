import React from "react";
import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
  thickness?: number;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "#bb1e1e",
  thickness = 3,
  className = "",
}) => {
  return (
    <div className={`${styles.spinnerContainer} ${styles[size]} ${className}`}>
      <div
        className={styles.spinner}
        style={{
          borderWidth: `${thickness}px`,
          borderTopColor: color,
        }}
      />
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
};
