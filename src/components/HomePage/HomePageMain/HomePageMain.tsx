import React from "react";
import styles from "./HomePageMain.module.scss";
import { HomePageMainCategories } from "./HomePageMainCategories/HomePageMainCategories";
import { Favorite, LatestNewsArticleType, NYTimesArticle } from "@/types/index";
import { HomePageMainArticles } from "./HomePageMainArticles/Articles";
import { useSearchParams } from "next/navigation";
import { FavoriteArticles } from "./HomePageMainArticles/FavoriteArticles";

interface HomePageMainProps {
  activeTab: string;
  favorites?: Favorite[];
  handleTabChange: (tab: string) => void;
  articles?: NYTimesArticle[];
  latestNews?: LatestNewsArticleType[];
}

export const HomePageMain = ({
  activeTab,
  favorites,
  handleTabChange,
  articles,
  latestNews,
}: HomePageMainProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Home";

  return (
    <div className={styles.container}>
      <HomePageMainCategories
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
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
