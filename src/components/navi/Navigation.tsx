"use client";
import Link from "next/link";
import React from "react";
import styles from "./navigation.module.css";
import { usePathname } from "next/navigation";

const naviItems = [
  { name: "一覧", path: "/" },
  { name: "追加", path: "/register" },
];

const Navigation = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className={styles.nav_container__sp}>
      <ul>
        {naviItems.map((item) => (
          <li
            key={item.name}
            className={`${styles.nav_item}  ${
              pathname === item.path ? styles.active : ""
            }`}
          >
            <Link href={item.path}>
              <span className={`${styles.nav_item__text}`}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
