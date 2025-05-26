"use client";

import { NewsAppLogo } from "@/components/svg/NewsAppLogoIcon";
import React, { useEffect, useState } from "react";
import styles from "./HomePageHeader.module.scss";
import { SearchIcon } from "@/components/svg/SearchIcon";
import { BurgerMenuIcon } from "@/components/svg/BurgerMenuIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { MobileNavigation } from "./MobileNavigation";
import { ProfileDropdown } from "./ProfileDropdown";
import { UserType } from "@/types/index";
import { IoCloseOutline } from "react-icons/io5";

interface HomePageHeaderProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  user: UserType | null;
}

export const HomePageHeader = ({
  activeTab,
  handleTabChange,
  user,
}: HomePageHeaderProps) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );

  useEffect(() => {
    const query = searchParams.get("query") || "";
    if (query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    } else {
      params.delete("query");
    }

    router.push(`?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    router.push(`?${params.toString()}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <NewsAppLogo />
        <button onClick={toggleMobileMenu}>
          <BurgerMenuIcon className={styles.burgerMenu} />
        </button>
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className={styles.searchAndProfile}>
        <form onSubmit={handleSubmit} className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />

          <input
            type="text"
            placeholder="Search news"
            value={searchQuery}
            onChange={handleInputChange}
            aria-label="Search news articles"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <IoCloseOutline size={24} />
            </button>
          )}

          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Search"
          >
            SEARCH
          </button>
        </form>
        <ProfileDropdown user={user} />
      </div>
    </header>
  );
};