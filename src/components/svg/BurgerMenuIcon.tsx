import React from "react";

export const BurgerMenuIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="4" rx="1" fill="#1D1D1B" />
      <rect y="8" width="24" height="4" rx="1" fill="#1D1D1B" />
      <rect y="16" width="24" height="4" rx="1" fill="#1D1D1B" />
    </svg>
  );
};
