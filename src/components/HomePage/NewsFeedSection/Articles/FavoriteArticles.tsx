import { Favorite } from "@/types/index";
import React from "react";
import styles from "./Articles.module.scss";
import { FavoriteArticle } from "./FavoriteArticle";

export const FavoriteArticles = ({ favorites }: { favorites?: Favorite[] }) => {
  return (
    <div className={styles.articles}>
      {favorites && favorites?.length > 0 ? (
        favorites.map((article) => {
          return (
            <FavoriteArticle
              key={article.id || article.url}
              article={article}
              isFavorited={true}
            />
          );
        })
      ) : (
        <div className={styles.noArticlesContainer}>
          <p className={styles.noArticlesText}>No favorite articles found.</p>
          <p className={styles.noArticlesText}>
            You can add articles to your favorites by clicking the bookmark icon
            on any article.
          </p>
        </div>
      )}
    </div>
  );
};
