import React, { useEffect, useRef, useState } from "react";
import styles from "./LatestNewsWidget.module.scss";
import { LatestNewsIcon } from "@/components/svg/LatestNewsIcon";
import { ArrowRightIcon } from "@/components/svg/ArrowRightIcon";
import { LatestNewsArticleType } from "@/types/index";
import { LatestNewsArticle } from "./LatestNewsArticle";
import Link from "next/link";
import { LoadingSpinner } from "@/components/Custom/LoadingSpinner";

interface LatestNewsWidgetProps {
  initialArticles?: LatestNewsArticleType[];
}

export const LatestNewsWidget = ({
  initialArticles,
}: LatestNewsWidgetProps) => {
  const [latestNews, setLatestNews] = useState<LatestNewsArticleType[]>(
    initialArticles || [],
  );
  const [offset, setOffset] = useState(initialArticles?.length);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchLatestNews = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/latest-news?offset=${offset}&limit=20`,
      );
      const data = await response.json();
      if (!data?.results) {
        setReachedEnd(true);
        return;
      }
      setLatestNews((prev) => [...prev, ...(data?.results ?? [])]);
      setOffset((prev) => prev! + 20);
    } catch (error) {
      console.error("Error fetching latest news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reachedEnd) {
      return;
    }
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoading) {
          fetchLatestNews();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isLoading, reachedEnd]);

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.widgetHeader}>
        <LatestNewsIcon />
        <h2>Latest news</h2>
      </div>

      <div className={styles.articlesContainer}>
        {latestNews.map((article, index) => (
          <LatestNewsArticle article={article} key={article?.url + index} />
        ))}
        {!reachedEnd && (
          <div ref={containerRef} className={styles.loadingIndicator}>
            {isLoading && <LoadingSpinner size="small" />}
          </div>
        )}
      </div>

      <div className={styles.widgetFooter}>
        <Link href="">See all news</Link>
        <ArrowRightIcon className={styles.arrowIcon} />
      </div>
    </div>
  );
};
