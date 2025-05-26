import React from "react";
import styles from "./HomePageContainer.module.scss";
import { useRouter } from "next/navigation";

const options = ["Featured", "Latest"];

interface HomePageTypeSelectorProps {
  newsType: string;
  handleTabChange: (tab: string) => void;
}

export const HomePageTypeSelector = ({
  newsType,
  handleTabChange,
}: HomePageTypeSelectorProps) => {
  const router = useRouter();

  const handleActiveTabChange = (tab: string) => {
    handleTabChange(tab);
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
