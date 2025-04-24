"use client";
import BookInfoViewer from "@/components/bookInfoViewer/BookInfoViewer";
import React, { useEffect, useState } from "react";
import { BookViewData } from "@/types";
import { fetchBookById } from "@/lib/api/auth/book";
import { useParams } from "next/navigation";
import styles from "./page.module.css"; // スタイルを追加する前提
import { Skeleton } from "@mantine/core";

const Page = () => {
  const { bookId } = useParams() as { bookId: string };
  const [bookData, setBookData] = useState<BookViewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const bookData = await fetchBookById(bookId);
        setBookData(bookData);
        if (!bookData) {
          setError("本が見つかりませんでした");
        }
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
        setError("データの取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  // スケルトンUIの表示
  if (isLoading) {
    return <BookDetailSkeleton />;
  }

  if (error || !bookData) {
    return (
      <p className={styles.errorMessage}>
        {error || "本が見つかりませんでした"}
      </p>
    );
  }

  const book: BookViewData = {
    id: bookData.id,
    title: bookData.title,
    author: bookData.author,
    borrowedDate: bookData.borrowedDate,
    dueDate: bookData.dueDate,
    returned: bookData.returned,
    review: bookData.review || "",
  };

  return (
    <Skeleton visible={isLoading}>
      <BookInfoViewer book={book} />
    </Skeleton>
  );
};

// スケルトンUIコンポーネント
const BookDetailSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonAuthor}></div>
      </div>
      <div className={styles.skeletonDetails}>
        <div className={styles.skeletonRow}></div>
        <div className={styles.skeletonRow}></div>
        <div className={styles.skeletonRow}></div>
      </div>
      <div className={styles.skeletonReview}>
        <div className={styles.skeletonReviewHeader}></div>
        <div className={styles.skeletonReviewContent}></div>
        <div className={styles.skeletonReviewContent}></div>
      </div>
    </div>
  );
};

export default Page;
