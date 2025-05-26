"use client";

import React from "react";
import styles from "./HomePage.module.scss";
import { useRouter, useSearchParams } from "next/navigation";

const options = ["Featured", "Latest"];

export const TypeSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newsType = searchParams.get("type") || "Featured";

  const handleActiveTabChange = (tab: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("type", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className={styles.selectorContainer}>
      {options.map((option) => (
        <button
          key={option}
          className={newsType === option ? styles.activeOption : undefined}
          onClick={() => handleActiveTabChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
