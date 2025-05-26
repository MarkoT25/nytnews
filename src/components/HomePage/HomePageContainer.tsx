"use client";

import React, { useEffect, useState } from "react";
import { HomePageHeader } from "./HomePageHeader/HomePageHeader";
import { HomePageMain } from "./HomePageMain/HomePageMain";
import styles from "./HomePageContainer.module.scss";
import { useSearchParams } from "next/navigation";
import {
  Favorite,
  LatestNewsArticleType,
  NYTimesArticle,
  UserType,
} from "@/types/index";
import { HomePageTypeSelector } from "./HomePageTypeSelector";
import { LatestNewsWidget } from "./HomePageMain/LatestNewsWidget/LatestNewsWidget";

interface HomePageContainerProps {
  articles?: NYTimesArticle[];
  favorites?: Favorite[];
  latestNews?: LatestNewsArticleType[];
  user: UserType | null;
}

export const HomePageContainer = ({
  articles,
  favorites,
  latestNews,
  user,
}: HomePageContainerProps) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("category") || "Home",
  );
  const [newsType, setNewsType] = useState(
    searchParams.get("type") || "Featured",
  );

  useEffect(() => {
    setActiveTab(searchParams.get("category") || "Home");
    setNewsType(searchParams.get("type") || "Featured");
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChangeNewsType = (type: string) => {
    setNewsType(type);
  };
  return (
    <div className={styles.pageContainer}>
      <HomePageHeader
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        user={user}
      />
      <HomePageTypeSelector
        newsType={newsType}
        handleTabChange={handleChangeNewsType}
      />
      <div className={styles.desktopMain}>
        <HomePageMain
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          articles={articles}
          favorites={favorites}
          latestNews={latestNews}
        />
      </div>
      <div className={styles.mobileMain}>
        {newsType === "Featured" ? (
          <HomePageMain
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            articles={articles}
            favorites={favorites}
            latestNews={latestNews}
          />
        ) : (
          <LatestNewsWidget initialArticles={latestNews} />
        )}
      </div>
    </div>
  );
};
