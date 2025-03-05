import { BookInfo } from "@/types/types";
import styles from "./bookCard.module.css";
import React from "react";

const BookCard = (props: { book: BookInfo }) => {
  return (
    <a
      href={props.book.id}
      className={`${styles.bookCard}`}
      aria-labelledby={`title-${props.book.id}`}
      role="article"
    >
      <div
        className={`${styles.bookInfo_contaier}`}
        id={`title-${props.book.id}`}
      >
        <p className={`${styles.bookCard_title}`}>{props.book.title}</p>
        <p className={`${styles.bookCard_author}`}>{props.book.author}</p>
        <p className={`${styles.bookCard_status}`}>
          {props.book.returned ? "返却済み" : "未返却"}
        </p>
      </div>
      <div>
        <div className={`${styles.bookCard_borrowedDateContainer}`}>
          <span>貸出日:</span>
          <span>{props.book.borrowedDate.toLocaleDateString()}</span>
        </div>
        <div className={`${styles.bookCard_dueDateContainer}`}>
          <span>返却日:</span>
          <span>{props.book.dueDate.toLocaleDateString()}</span>
        </div>
      </div>
    </a>
  );
};

export default BookCard;
