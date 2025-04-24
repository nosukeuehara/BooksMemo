"use client";
import { BookViewData } from "@/types";
import styles from "./styles.module.css";
import { Button } from "@mantine/core";
import { LibraryBig } from "lucide-react";
import { useState } from "react";

export function SideNav({ books }: { books: BookViewData[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    console.log("toggleMenu", isOpen);
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Button
        variant="transparent"
        onClick={toggleMenu}
        className={`${styles.menuButton}`}
        leftSection={<LibraryBig color="#666" size={16} />}
      />
      <div
        className={`${styles.bookGallery} ${
          isOpen ? styles.open : styles.close
        }`}
      >
        {books.map((book) => (
          <a href={book.id} key={book.id} className={styles.bookLink}>
            <p className={styles.bookTitle}>{book.title}</p>
            <p className={styles.bookAuthor}>{book.author}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
