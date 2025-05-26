import React from "react";
import { Header } from "./Header/Header";
import { NewsFeedSection } from "./NewsFeedSection/NewsFeedSection";
import styles from "./HomePage.module.scss";
import {
  Favorite,
  LatestNewsArticleType,
  NYTimesArticle,
  UserType,
} from "@/types/index";
import { TypeSelector } from "./TypeSelector";
import { LatestNewsWidget } from "./NewsFeedSection/LatestNewsWidget/LatestNewsWidget";

interface HomePageProps {
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

export const HomePage = ({
  articles,
  favorites,
  latestNews,
  user,
  searchParams,
}: HomePageProps) => {
  const newsType = searchParams?.type || "Featured";
  return (
    <div className={styles.pageContainer}>
      <Header user={user} />
      <TypeSelector />
      <div className={styles.desktopMain}>
        <NewsFeedSection
          articles={articles}
          favorites={favorites}
          latestNews={latestNews}
        />
      </div>
      <div className={styles.mobileMain}>
        {newsType === "Featured" ? (
          <NewsFeedSection
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
