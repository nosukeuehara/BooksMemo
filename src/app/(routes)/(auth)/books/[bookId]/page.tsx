"use client";
import { Suspense, useEffect, useState } from "react";
import styles from "./page.module.css";
import BookDetailSkeleton from "@/components/bookDetailSkelton/BookDetailSkeleton";
import { BookPage } from "@/components/bookPage/BookPage";
import { usePathname } from "next/navigation";
import { BookViewData } from "@/types";
import { fetchAllBooks } from "@/lib/api/auth/book";
import { Button } from "@mantine/core";
import { LibraryBig, X } from "lucide-react";
import { SideNav } from "@/components/sideNav/SideNav";

const Page = () => {
  const bookId = usePathname().split("/").pop();
  const [books, setBooks] = useState<BookViewData[]>([]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const getBooks = async () => {
      const fetchedBooks = await fetchAllBooks();
      setBooks(fetchedBooks);
    };
    getBooks();
  }, [bookId]);

  const toggleMenu = () => {
    setIsNavOpen((prev) => !prev);
  };

  if (!bookId || !books.length) {
    return <BookDetailSkeleton />;
  }

  const bookIndex = books.findIndex((book) => String(book.id) === bookId);

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

        <div className={styles.contentArea}>
          <div className={styles.mainContent}>
            <Suspense fallback={<BookDetailSkeleton />}>
              <BookPage book={books[bookIndex]} />
            </Suspense>
          </div>
        </div>
      </div>

      {isNavOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </div>
  );
};

export default Page;
