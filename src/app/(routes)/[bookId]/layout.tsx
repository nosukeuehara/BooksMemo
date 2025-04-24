import { fetchAllBooks } from "@/lib/api/auth/book";
import { BookViewData } from "@/types";
import styles from "./layout.module.css";
import Link from "next/link";

// 実際のコンテンツを表示するコンポーネント
const BookGalleryContent = async () => {
  const books: BookViewData[] = await fetchAllBooks();

  return (
    <div className={styles.bookGallery}>
      {books.map((book) => (
        <Link href={book.id} key={book.id} className={styles.bookLink}>
          <p className={styles.bookTitle}>{book.title}</p>
          <p className={styles.bookAuthor}>{book.author}</p>
        </Link>
      ))}
    </div>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.bookGalleryLayout}>
      <BookGalleryContent />
      <div className={styles.contentArea}>{children}</div>
    </div>
  );
}
