"use client";

import React from "react";
import styles from "./HomePageMainCategories.module.scss";
import { HomePageMainCategory } from "./HomePageMainCategory";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/util/categories";

interface HomePageMainCategoriesProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  type?: "desktop" | "mobile";
}

export const HomePageMainCategories = ({
  activeTab,
  handleTabChange,
  type = "desktop",
}: HomePageMainCategoriesProps) => {
  const router = useRouter();

  const handleActiveTabChange = (tab: string) => {
    handleTabChange(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("category", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div
      className={
        type === "mobile" ? styles.mobileCategories : styles.desktopCategories
      }
    >
      {CATEGORIES.map((category) => (
        <HomePageMainCategory
          category={category}
          key={category.name}
          activeTab={activeTab}
          handleTabChange={handleActiveTabChange}
        />
      ))}
    </div>
  );
};
