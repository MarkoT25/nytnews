"use client";

import React from "react";
import styles from "./HomePageMainCategories.module.scss";
import { HomePageMainCategory } from "./HomePageMainCategory";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/util/categories";

interface HomePageMainCategoriesProps {
  type?: "desktop" | "mobile";
  closeMobileNav?: () => void;
}

export const HomePageMainCategories = ({
  type = "desktop",
  closeMobileNav,
}: HomePageMainCategoriesProps) => {
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
        <HomePageMainCategory
          key={category.name}
          category={category}
          handleTabChange={handleActiveTabChange}
        />
      ))}
    </div>
  );
};
