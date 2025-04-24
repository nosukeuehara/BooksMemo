import { Suspense } from "react";
import { fetchAllBooks, fetchBookById } from "@/lib/api/auth/book";
import styles from "./page.module.css";
import BookDetailSkeleton from "@/components/bookDetailSkelton/BookDetailSkeleton";
import { BookViewData } from "@/types";
import Link from "next/link";
import BookInfoViewer from "@/components/bookInfoViewer/BookInfoViewer";

async function BookPage({ params }: { params: { bookId: string } }) {
  try {
    const book = await fetchBookById((await params).bookId);

    if (!book) {
      throw new Error("本が見つかりませんでした");
    }

    // クライアントコンポーネントでラップして返す
    return <BookInfoViewer book={book} />;
  } catch (error) {
    return (
      <p className={styles.errorMessage}>
        {error instanceof Error ? error.message : "データの取得に失敗しました"}
      </p>
    );
  }
}

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

export default function Page({ params }: { params: { bookId: string } }) {
  return (
    <div className={styles.bookGalleryLayout}>
      <BookGalleryContent />
      <Suspense fallback={<BookDetailSkeleton />}>
        <BookPage params={params} />
      </Suspense>
    </div>
  );
}
