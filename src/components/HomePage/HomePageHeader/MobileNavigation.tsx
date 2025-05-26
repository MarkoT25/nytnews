"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./MobileNavigation.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { NewsAppLogo } from "@/components/svg/NewsAppLogoIcon";
import { SearchIcon } from "@/components/svg/SearchIcon";
import { HomePageMainCategories } from "../HomePageMain/HomePageMainCategories/HomePageMainCategories";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}) => {
  const router = useRouter();
  const [animateIn, setAnimateIn] = useState(false);
  const searchParams = useSearchParams();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Opening animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimateIn(true), 10);
      document.body.style.overflow = "hidden";
      setLocalSearchQuery(searchQuery);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "";
    }
  }, [isOpen, searchQuery]);

  // Close on escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (localSearchQuery.trim()) {
      params.set("query", localSearchQuery.trim());
      setSearchQuery(localSearchQuery.trim());
    } else {
      params.delete("query");
      setSearchQuery("");
    }

    router.push(`?${params.toString()}`);
    onClose();
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    router.push(`?${params.toString()}`);
    setSearchQuery("");
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.mobileNav} ${animateIn ? styles.open : ""}`}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.modalContent}>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close menu"
        >
          <IoCloseOutline size={32} />
        </button>

        <div className={styles.logoContainer}>
          <NewsAppLogo />
        </div>

        <div className={styles.actionsContainer}>
          <form onSubmit={handleSubmit} className={styles.searchContainer}>
            <button
              type="submit"
              className={styles.searchIcon}
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {localSearchQuery !== "" && (
              <button
                type="button"
                className={styles.clearSearchIcon}
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <IoCloseOutline size={24} />
              </button>
            )}

            <input
              type="text"
              placeholder="Search news"
              value={localSearchQuery}
              onChange={handleInputChange}
              aria-label="Search news articles"
            />
          </form>

          <HomePageMainCategories type="mobile" closeMobileNav={onClose} />
        </div>
      </div>
    </div>
  );
};
