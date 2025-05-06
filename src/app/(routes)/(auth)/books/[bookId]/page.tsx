import { Suspense } from "react";
import styles from "./page.module.css";
import BookDetailSkeleton from "@/components/bookDetailSkelton/BookDetailSkeleton";
import { BookPage } from "@/components/bookPage/BookPage";
import { fetchBookById } from "@/lib/api/auth/book";

const page = async ({ params }: { params: { bookId: string } }) => {
  const book = await fetchBookById((await params).bookId);
  return (
    <div className={styles.mainContent}>
      <Suspense fallback={<BookDetailSkeleton />}>
        <BookPage book={book} />
      </Suspense>
    </div>
  );
};

export default page;
