"use client";
import React, { useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import styles from "./Articles.module.scss";
import { Favorite, NYTimesArticle } from "@/types/index";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  article?: NYTimesArticle;
  favoriteArticle?: Favorite;
  isFavorited: boolean;
  type?: "favorite" | "default";
}

export const FavoriteButton = ({
  article,
  favoriteArticle,
  isFavorited,
  type = "default",
}: FavoriteButtonProps) => {
  const router = useRouter();
  const [isOptimisticFavorited, setIsOptimisticFavorited] =
    useState(isFavorited);

  async function handleFavoriteClick(event: React.MouseEvent) {
    event.preventDefault();

    setIsOptimisticFavorited(!isOptimisticFavorited);

    let requestBody = {};
    if (type === "favorite") {
      requestBody = {
        url: favoriteArticle?.url,
      };
    } else {
      requestBody = {
        title: article?.headline.main,
        url: article?.web_url,
        imageUrl: article?.multimedia?.default?.url,
        category: article?.section_name,
        createdBy: article?.byline?.original?.replace("By ", ""),
      };
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/favorites`,
        {
          method: isFavorited ? "DELETE" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!res.ok) {
        setIsOptimisticFavorited(isFavorited);
        console.error("Failed to update favorite status");
      }

      const response = await res;

      return response.json();
    } catch (error) {
      console.error("Error handling favorite click:", error);
      setIsOptimisticFavorited(isFavorited);
    } finally {
      router.refresh();
    }
  }
  return (
    <>
      {isOptimisticFavorited ? (
        <IoBookmark
          onClick={handleFavoriteClick}
          className={styles.bookmarkIcon}
        />
      ) : (
        <IoBookmarkOutline
          onClick={handleFavoriteClick}
          className={styles.bookmarkIcon}
        />
      )}
    </>
  );
};
