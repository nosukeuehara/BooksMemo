import { fetchAllBooks } from "@/lib/api/auth/book";
import styles from "./layout.module.css";
import React from "react";
import { SideNav } from "@/components/sideNav/SideNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const books = await fetchAllBooks();

  return (
    <div className={styles.bookGalleryLayout}>
      <SideNav books={books} />
      <div className={styles.contentArea}>{children}</div>
    </div>
  );
}
