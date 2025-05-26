"use client";

import React from "react";
import styles from "./HomePageMain.module.scss";
import { HomePageMainCategories } from "./HomePageMainCategories/HomePageMainCategories";
import { Favorite, LatestNewsArticleType, NYTimesArticle } from "@/types/index";
import { HomePageMainArticles } from "./HomePageMainArticles/Articles";
import { FavoriteArticles } from "./HomePageMainArticles/FavoriteArticles";
import { useSearchParams } from "next/navigation";

interface HomePageMainProps {
  favorites?: Favorite[];
  articles?: NYTimesArticle[];
  latestNews?: LatestNewsArticleType[];
}

export const HomePageMain = ({
  favorites,
  articles,
  latestNews,
}: HomePageMainProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Home";
  return (
    <div className={styles.container}>
      <HomePageMainCategories />
      <div className={styles.content}>
        <div className={styles.title}>News</div>
        {category === "Favorites" ? (
          <FavoriteArticles favorites={favorites} />
        ) : (
          <HomePageMainArticles
            articles={articles}
            favorites={favorites}
            latestNews={latestNews}
          />
        )}
      </div>
    </div>
  );
};
