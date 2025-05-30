import { CustomSvgIconType } from "@/types/index";
import React from "react";

export const LatestNewsIcon = ({
  width = "20",
  height = "20",
  className,
}: CustomSvgIconType) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.24" cx="10" cy="10" r="10" fill="#BB1E1E" />
      <circle cx="10" cy="10" r="5" fill="#BB1E1E" />
    </svg>
  );
};
