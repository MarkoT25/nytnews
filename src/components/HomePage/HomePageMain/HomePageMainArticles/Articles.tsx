"use client";

import React, { useEffect, useState } from "react";
import styles from "./Articles.module.scss";
import { Favorite, LatestNewsArticleType, NYTimesArticle } from "@/types/index";
import { Article } from "./Article";
import { LatestNewsWidget } from "../LatestNewsWidget/LatestNewsWidget";
import { useSearchParams } from "next/navigation";

interface HomePageMainArticlesProps {
  articles?: NYTimesArticle[];
  favorites?: Favorite[];
  latestNews?: LatestNewsArticleType[];
}

export const HomePageMainArticles = ({
  articles,
  favorites,
  latestNews,
}: HomePageMainArticlesProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Home";
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const checkScreenSize = () => {
      const windowWidth = window.innerWidth;
      setIsLargeScreen(windowWidth >= 1024);
      setIsMobileScreen(windowWidth < 768);
    };

    checkScreenSize();

    const handleResize = () => checkScreenSize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const widgetPosition = isLargeScreen ? 2 : 1;
  const shouldShowWidget =
    category === "Home" && query === "" && !isMobileScreen;

  return (
    <div className={styles.articles}>
      {articles && articles?.length > 0 ? (
        articles.map((article, index) => {
          const isFavorited = favorites?.some(
            (favorite) => favorite.url === article.web_url,
          );
          if (index === widgetPosition && shouldShowWidget) {
            return (
              <LatestNewsWidget
                key={article._id || article.web_url}
                initialArticles={latestNews}
              />
            );
          }

          return (
            <Article
              key={article._id || article.web_url}
              article={article}
              isFavorited={isFavorited}
            />
          );
        })
      ) : (
        <div className={styles.noArticlesContainer}>
          <p className={styles.noArticles}>
            No articles available at the moment.
          </p>
          <p className={styles.noArticlesDescription}>
            Please check back later or try a different section.
          </p>
        </div>
      )}
    </div>
  );
};
