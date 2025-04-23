import { fetchAllBooks } from "@/lib/api/auth/book";
import { BookViewData } from "@/types";
import styles from "./layout.module.css";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const books: BookViewData[] = await fetchAllBooks();
  return (
    <div className={`${styles.bookGalleryLayout}`}>
      <div className={`${styles.bookGallery}`}>
        {books.map((book) => (
          <Link href={book.id} key={book.id}>
            <p>{book.title}</p>
            <p>{book.author}</p>
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
