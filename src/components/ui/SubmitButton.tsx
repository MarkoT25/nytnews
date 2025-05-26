"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import styles from "./SubmitButton.module.scss";

interface SubmitButtonProps {
  text: string;
  loadingText?: string;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  loadingText = "Processing...",
  className = "",
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${styles.submitButton} ${className}`}
      disabled={pending}
    >
      {pending ? loadingText : text}
      {pending && (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </button>
  );
};
