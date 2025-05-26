"use client";

import React from "react";
import styles from "./Articles.module.scss";
import Image from "next/image";
import { NYTimesArticle } from "@/types/index";
import Link from "next/link";
import { CameraOffIcon } from "@/components/svg/CameraOffIcon";
import { FavoriteButton } from "./FavoriteButton";

interface ArticleProps {
  article: NYTimesArticle;
  isFavorited?: boolean;
}

export const Article = ({ article, isFavorited = false }: ArticleProps) => {
  return (
    <Link href={article.web_url} className={styles.article}>
      <FavoriteButton article={article} isFavorited={isFavorited} />
      <div className={styles.imageContainer}>
        {article.multimedia &&
        article.multimedia.default &&
        article.multimedia.default.url !== "" ? (
          <Image
            src={article.multimedia.default.url}
            alt={article.headline.main}
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
          <p className={styles.section}>{article.section_name}</p>
          <h2 className={styles.title}>{article.headline.main}</h2>
        </div>
        <div className={styles.contentCreator}>
          <p>{article.byline?.original?.replace("By ", "")}</p>
        </div>
      </div>
    </Link>
  );
};
