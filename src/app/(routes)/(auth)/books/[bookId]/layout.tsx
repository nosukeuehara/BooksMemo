"use client";
import { fetchAllBooks } from "@/lib/api/auth/book";
import styles from "./layout.module.css";
import React, { useState, useEffect } from "react";
import { SideNav } from "@/components/sideNav/SideNav";
import { BookViewData } from "@/types";
import { LibraryBig, X } from "lucide-react";
import { Button } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<BookViewData[]>([]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      const fetchedBooks = await fetchAllBooks();
      setBooks(fetchedBooks);
    };
    getBooks();
  }, []);

  const toggleMenu = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.container} ${isNavOpen ? styles.navOpen : ""}`}>
      <Button
        variant="transparent"
        px="xs"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleMenu();
        }}
      >
        {isNavOpen ? (
          <X color="#666" size={20} />
        ) : (
          <LibraryBig color="#666" size={20} />
        )}
      </Button>

      <div className={styles.bookGalleryLayout}>
        <div className={`${styles.sidebar}`}>
          <SideNav books={books} isOpen={isNavOpen} toggleMenu={toggleMenu} />
        </div>

        <div className={styles.contentArea}>{children}</div>
      </div>

      {isNavOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </div>
  );
}
