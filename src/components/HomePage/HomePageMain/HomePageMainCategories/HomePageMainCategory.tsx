import React from "react";
import styles from "./HomePageMainCategories.module.scss";

interface Category {
  name: string;
  icon: React.ComponentType<any>;
}

interface HomePageMainCategoryProps {
  category: Category;
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

export const HomePageMainCategory = ({
  activeTab,
  category,
  handleTabChange,
}: HomePageMainCategoryProps) => {
  return (
    <button
      onClick={() => handleTabChange(category.name)}
      className={
        category.name === activeTab ? styles.activeCategory : styles.category
      }
    >
      <category.icon
        color={category.name === activeTab ? "#bb1e1e" : "#888989"}
      />
      <span className={styles.categoryName}>{category.name}</span>
      <div className={styles.underline}></div>
    </button>
  );
};
