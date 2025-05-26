import Link from "next/link";
import React from "react";
import { FavoriteButton } from "./FavoriteButton";
import Image from "next/image";
import { CameraOffIcon } from "@/components/svg/CameraOffIcon";
import styles from "./Articles.module.scss";
import { Favorite } from "@/types/index";

interface ArticleProps {
  article: Favorite;
  isFavorited?: boolean;
}

export const FavoriteArticle = ({
  article,
  isFavorited = false,
}: ArticleProps) => {
  return (
    <Link href={article.url} className={styles.article}>
      <FavoriteButton
        favoriteArticle={article}
        isFavorited={isFavorited}
        type="favorite"
      />
      <div className={styles.imageContainer}>
        {article?.imageUrl && article?.imageUrl !== "" ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <CameraOffIcon />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <p className={styles.section}>{article?.category}</p>
          <h2 className={styles.title}>{article.title}</h2>
        </div>
        <div className={styles.contentCreator}>
          <p>{article?.createdBy}</p>
        </div>
      </div>
    </Link>
  );
};
