"use client";

import { logoutUser } from "@/lib/auth";
import React from "react";

const Test = () => {
  async function handleLogout() {
    await logoutUser();
  }

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <button onClick={handleLogout} className="bg-red-500 cursor-pointer">
        logout
      </button>
    </div>
  );
};

export default Test;
