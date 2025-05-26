import React from "react";
import styles from "./HomePageMainCategories.module.scss";
import { useSearchParams } from "next/navigation";

interface Category {
  name: string;
  icon: React.ComponentType<any>;
}

interface HomePageMainCategoryProps {
  category: Category;
  handleTabChange: (tab: string) => void;
}

export const HomePageMainCategory = ({
  category,
  handleTabChange,
}: HomePageMainCategoryProps) => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "Home";
  return (
    <button
      onClick={() => handleTabChange(category.name)}
      className={
        category.name === activeCategory
          ? styles.activeCategory
          : styles.category
      }
    >
      <category.icon
        color={category.name === activeCategory ? "#bb1e1e" : "#888989"}
      />
      <span className={styles.categoryName}>{category.name}</span>
      <div className={styles.underline}></div>
    </button>
  );
};
