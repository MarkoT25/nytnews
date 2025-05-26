"use client";

import React from "react";
import styles from "./HomePageMainCategories.module.scss";
import { Category } from "./Category";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/util/categories";

interface CategoriesProps {
  type?: "desktop" | "mobile";
  closeMobileNav?: () => void;
}

export const Categories = ({
  type = "desktop",
  closeMobileNav,
}: CategoriesProps) => {
  const router = useRouter();

  const handleActiveTabChange = (tab: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("category", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
    if (type === "mobile" && closeMobileNav) {
      closeMobileNav();
    }
  };
  return (
    <div
      className={
        type === "mobile" ? styles.mobileCategories : styles.desktopCategories
      }
    >
      {CATEGORIES.map((category) => (
        <Category
          key={category.name}
          category={category}
          handleTabChange={handleActiveTabChange}
        />
      ))}
    </div>
  );
};
