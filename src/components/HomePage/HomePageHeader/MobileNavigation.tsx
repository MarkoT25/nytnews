"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./MobileNavigation.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import { NewsAppLogo } from "@/components/svg/logo";
import { SearchIcon } from "@/components/svg/SearchIcon";
import { HomePageMainCategories } from "../HomePageMain/HomePageMainCategories/HomePageMainCategories";
import { useDebounce } from "@/hooks/useDebounce";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  activeTab,
  handleTabChange,
}) => {
  const router = useRouter();
  const [animateIn, setAnimateIn] = useState(false);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );

  const debouncedQuery = useDebounce(searchQuery, 500);

  // Opening animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimateIn(true), 10);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Sync searchQuery with URL when mobile nav opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery(searchParams.get("query") || "");
    }
  }, [isOpen, searchParams]);

  // Deobounce search query and update URL
  useEffect(() => {
    if (!isOpen) return;

    if (debouncedQuery !== searchParams.get("query")) {
      const params = new URLSearchParams(searchParams.toString());

      if (debouncedQuery) {
        params.set("query", debouncedQuery);
      } else {
        params.delete("query");
      }

      const category = searchParams.get("category");
      if (category) {
        params.set("category", category);
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedQuery, router, searchParams, isOpen]);

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

    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    } else {
      params.delete("query");
    }

    router.push(`?${params.toString()}`);
    onClose();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

            {searchQuery !== "" && (
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
              value={searchQuery}
              onChange={handleInputChange}
              aria-label="Search news articles"
            />
          </form>

          <HomePageMainCategories
            activeTab={activeTab}
            handleTabChange={(tab) => {
              handleTabChange(tab);
              onClose();
            }}
            type="mobile"
          />
        </div>
      </div>
    </div>
  );
};
