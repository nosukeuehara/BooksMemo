import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { UserButton } from "@/components/userButton/UserButton";
import { UserMenuItems } from "@/components/userMenuItems/UserMenuItems";

const Header = async ({ userName }: { userName: string | undefined }) => {
  if (!userName) return null;
  return (
    <header className={styles.header_container}>
      <div className={styles.header_content}>
        <Link href="/" className={styles.logo_link}>
          <span>📚coto</span>
        </Link>
        <UserButton userName={userName}>
          <UserMenuItems />
        </UserButton>
      </div>
    </header>
  );
};

export default Header;
