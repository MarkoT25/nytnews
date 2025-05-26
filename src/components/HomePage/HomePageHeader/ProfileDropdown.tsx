import React, { useEffect, useRef, useState } from "react";
import styles from "./HomePageHeader.module.scss";
import { GoPerson } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutUser } from "@/lib/auth";
import { UserType } from "@/types/index";

interface ProfileDropdownProps {
  user: UserType | null;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close profile menu when escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  async function handleLogout() {
    await logoutUser();
  }

  return (
    <div className={styles.profileContainer} ref={profileButtonRef}>
      <button
        onClick={toggleProfileMenu}
        className={styles.profileButton}
        aria-label="Open profile menu"
        aria-expanded={isProfileMenuOpen}
        aria-controls="profile-dropdown"
      >
        <GoPerson />
      </button>

      {isProfileMenuOpen && (
        <div
          className={styles.profileDropdown}
          ref={profileMenuRef}
          id="profile-dropdown"
          role="menu"
        >
          <div className={styles.profileHeader}>
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            <p>{user?.email}</p>
          </div>

          <ul className={styles.menuItems}>
            <li role="menuitem">
              <button
                onClick={handleLogout}
                className={`${styles.menuItem} ${styles.logoutButton}`}
              >
                <IoLogOutOutline />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
