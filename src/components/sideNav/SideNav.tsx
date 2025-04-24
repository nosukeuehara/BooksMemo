"use client";
import { BookViewData } from "@/types";
import styles from "./styles.module.css";

export function SideNav({
  books,
  isOpen,
}: {
  books: BookViewData[];
  isOpen: boolean;
  toggleMenu: () => void;
}) {
  return (
    <div
      className={`${styles.sideNavContainer} ${
        isOpen ? styles.open : styles.closed
      }`}
    >
      <div className={styles.sideNavHeader}>
        <h3>Book Gallery</h3>
      </div>

      <div className={styles.bookGallery}>
        {books.map((book) => (
          <a href={book.id} key={book.id}>
            <p className={styles.bookTitle}>{book.title}</p>
            <p className={styles.bookAuthor}>{book.author}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
