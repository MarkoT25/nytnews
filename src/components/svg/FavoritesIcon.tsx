import { CustomSvgIconType } from "@/types/index";
import React from "react";

export const FavoritesIcon = ({
  width = "24",
  height = "24",
  className,
  color = "none",
}: CustomSvgIconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-bookmark-check-icon lucide-bookmark-check ${className}`}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
      <path d="m9 10 2 2 4-4" />
    </svg>
  );
};
