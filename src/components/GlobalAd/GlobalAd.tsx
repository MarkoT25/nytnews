"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./GlobalAd.module.scss";

const localStorageKey = "globalAd";

export const GlobalAd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const dismissed = localStorage.getItem(localStorageKey);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  function handleDismiss() {
    setIsVisible(false);
    localStorage.setItem(localStorageKey, "true");
  }

  if (!isMounted) {
    return null;
  }
  return (
    <>
      {isVisible && (
        <header className={styles.header}>
          <Image
            src="/adBackground.png"
            alt="global ad background image"
            width={800}
            height={60}
            className={styles.img}
          />
          <div className={styles.container}>
            <div className={styles.leftContainer}>
              <h3>Make MyNews your homepage</h3>
              <span>
                {"Every day discover what's trending on the internet!"}
              </span>
            </div>
            <div className={styles.rightContainer}>
              <button
                type="button"
                className={styles.textButton}
                onClick={handleDismiss}
              >
                No, thanks
              </button>
              <button className={styles.getButton}>GET</button>
            </div>
          </div>
        </header>
      )}
    </>
  );
};
