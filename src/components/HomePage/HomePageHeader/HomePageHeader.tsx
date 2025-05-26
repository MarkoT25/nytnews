"use client";

import { NewsAppLogo } from "@/components/svg/logo";
import React, { useEffect, useState } from "react";
import styles from "./HomePageHeader.module.scss";
import { SearchIcon } from "@/components/svg/SearchIcon";
import { BurgerMenuIcon } from "@/components/svg/BurgerMenuIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { MobileNavigation } from "./MobileNavigation";
import { ProfileDropdown } from "./ProfileDropdown";
import { UserType } from "@/types/index";

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
    searchParams.get("query") || ""
  );

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    if (query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isMobileMenuOpen || debouncedQuery === searchParams.get("query")) {
      return;
    }
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
  }, [debouncedQuery, router, searchParams, isMobileMenuOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("query", searchQuery);
    } else {
      params.delete("query");
    }

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
