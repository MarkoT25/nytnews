import React from "react";
import { HomePageHeader } from "./HomePageHeader/HomePageHeader";
import { HomePageMain } from "./HomePageMain/HomePageMain";
import styles from "./HomePageContainer.module.scss";
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
  searchParams?: {
    category?: string;
    query?: string;
    type?: string;
  };
}

export const HomePageContainer = ({
  articles,
  favorites,
  latestNews,
  user,
  searchParams,
}: HomePageContainerProps) => {
  const newsType = searchParams?.type || "Featured";
  return (
    <div className={styles.pageContainer}>
      <HomePageHeader user={user} />
      <HomePageTypeSelector />
      <div className={styles.desktopMain}>
        <HomePageMain
          articles={articles}
          favorites={favorites}
          latestNews={latestNews}
        />
      </div>
      <div className={styles.mobileMain}>
        {newsType === "Featured" ? (
          <HomePageMain
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
