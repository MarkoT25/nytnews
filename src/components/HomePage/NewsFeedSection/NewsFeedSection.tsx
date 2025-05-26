"use client";

import React from "react";
import styles from "./NewsFeedSection.module.scss";
import { Categories } from "./Categories/Categories";
import { Favorite, LatestNewsArticleType, NYTimesArticle } from "@/types/index";
import { Articles } from "./Articles/Articles";
import { FavoriteArticles } from "./Articles/FavoriteArticles";
import { useSearchParams } from "next/navigation";

interface NewsFeedSectionProps {
  favorites?: Favorite[];
  articles?: NYTimesArticle[];
  latestNews?: LatestNewsArticleType[];
}

export const NewsFeedSection = ({
  favorites,
  articles,
  latestNews,
}: NewsFeedSectionProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Home";
  return (
    <div className={styles.container}>
      <Categories />
      <div className={styles.content}>
        <div className={styles.title}>News</div>
        {category === "Favorites" ? (
          <FavoriteArticles favorites={favorites} />
        ) : (
          <Articles
            articles={articles}
            favorites={favorites}
            latestNews={latestNews}
          />
        )}
      </div>
    </div>
  );
};
