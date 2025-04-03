"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav_container}>
      <ul className={styles.nav_list}>
        <li
          className={`${styles.nav_item} ${
            pathname === "/" ? styles.active : ""
          }`}
        >
          <Link href="/" className={styles.nav_link}>
            <span className={styles.nav_item__text}>ホーム</span>
          </Link>
        </li>
        <li
          className={`${styles.nav_item} ${
            pathname === "/register" ? styles.active : ""
          }`}
        >
          <Link href="/register" className={styles.nav_link}>
            <span className={styles.nav_item__text}>本を登録</span>
          </Link>
        </li>
        <li
          className={`${styles.nav_item} ${
            pathname === "/profile" ? styles.active : ""
          }`}
        >
          <Link href="/profile" className={styles.nav_link}>
            <span className={styles.nav_item__text}>プロフィール</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
