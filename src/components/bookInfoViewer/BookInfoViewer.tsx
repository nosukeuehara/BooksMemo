import { BookInfo } from "@/types/types";
import React from "react";
import styles from "./bookInfoViewer.module.css";

interface BookInfoProps {
  book: BookInfo;
}

const BookInfoViewer = ({ book }: BookInfoProps) => {
  return (
    <div className={styles.bookInfoViewer}>
      <h1 className={styles.bookTitle}>{book.title}</h1>
      <p className={styles.bookAuthor}>{book.author}</p>
      <p className={styles.bookReview}>{book.review}</p>
    </div>
  );
};

export default BookInfoViewer;
