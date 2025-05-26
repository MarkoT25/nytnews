import React from "react";
import styles from "./LatestNewsWidget.module.scss";
import { LatestNewsArticleType } from "@/types/index";
import Link from "next/link";

interface LatestNewsArticleProps {
  article: LatestNewsArticleType;
}

export const LatestNewsArticle = ({ article }: LatestNewsArticleProps) => {
  const publishedDate = new Date(article.published_date);
  const localTime = publishedDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Link href={article?.url} className={styles.latestArticle}>
      <p>{localTime}</p>
      <h3>{article.title}</h3>
    </Link>
  );
};
