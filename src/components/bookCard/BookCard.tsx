import { BookInfo } from "@/types/types";
import styles from "./bookCard.module.css";
import React from "react";

const BookCard = (props: { book: BookInfo }) => {
  return (
    <a href={props.book.id} className={`${styles.bookCard}`}>
      <div className={`${styles.bookCard__title}`}>
        <h2>{props.book.title}</h2>
      </div>
      <div className={`${styles.bookCard_authorContainer}`}>
        <span>著者:</span>
        <span>{props.book.author}</span>
      </div>
      <div className={`${styles.bookCard_borrowedDateContainer}`}>
        <span>貸出日:</span>
        <span>{props.book.borrowedDate.toLocaleString()}</span>
      </div>
      <div className={`${styles.bookCard_dueDateContainer}`}>
        <span>返却日:</span>
        <span>{props.book.dueDate.toLocaleString()}</span>
      </div>
      <div className={`${styles.bookCard_statusContainer}`}>
        <span>{props.book.returned ? "返却済み" : "未返却"}</span>
      </div>
    </a>
  );
};

export default BookCard;
