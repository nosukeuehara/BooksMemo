import { BookViewData } from "@/types";
import styles from "./bookCard.module.css";
import React from "react";

export const BookCard = (props: { book: BookViewData }) => {
  return (
    <li className={`${styles.cardItem}`}>
      <a
        href={props.book.id}
        className={`${styles.bookCard}`}
        aria-labelledby={`title-${props.book.id}`}
        role="article"
      >
        <p className={`${styles.bookCard_title}`}>{props.book.title}</p>
        <p className={`${styles.bookCard_author}`}>{props.book.author}</p>
        <div className={`${styles.bookCard_borrowedDateContainer}`}>
          <span>{props.book.borrowedDate.toLocaleDateString()}</span>
        </div>
        <div className={`${styles.bookCard_dueDateContainer}`}>
          <span>{props.book.dueDate.toLocaleDateString()}</span>
        </div>
        <p className={`${styles.bookCard_status}`}>
          {props.book.returned ? "返却済み" : "未返却"}
        </p>
        <div>{props.book.review}</div>
      </a>
    </li>
  );
};

export const BookHeader = () => {
  return (
    <li className={`${styles.cardItem} ${styles.bookHeader}`}>
      <div className={`${styles.bookHeader_items}`}>
        <p className={`${styles}`}>タイトル</p>
        <p className={`${styles}`}>著者</p>
        <p className={`${styles}`}>貸出日</p>
        <p className={`${styles}`}>返却日</p>
        <p className={`${styles}`}>ステータス</p>
        <p>感想</p>
      </div>
    </li>
  );
};
