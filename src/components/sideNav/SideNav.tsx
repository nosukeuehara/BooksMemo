"use client";
import { BookViewData } from "@/types";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function SideNav({
  books,
  isOpen,
}: {
  books: BookViewData[];
  isOpen: boolean;
  toggleMenu: () => void;
}) {
  const pathname = usePathname().split("/").pop();
  return (
    <div
      className={`${styles.sideNavContainer} ${
        isOpen ? styles.open : styles.closed
      }`}
    >
      <div className={styles.sideNavHeader}>
        <h3>📖本棚📖</h3>
      </div>

      <div className={styles.bookGallery}>
        {books.map((book) => {
          return (
            <Link
              href={`/books/${book.id}`}
              key={book.id}
              className={book.id === pathname ? styles.selected : ""}
            >
              <p className={styles.bookTitle}>{book.title}</p>
              <p className={styles.bookAuthor}>{book.author}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
