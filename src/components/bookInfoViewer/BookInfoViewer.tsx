import React from "react";
import styles from "./bookInfoViewer.module.css";
import { BookViewData } from "@/types";

interface BookInfoProps {
  book: BookViewData;
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
