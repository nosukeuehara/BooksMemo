"use client";
import { BookViewData } from "@/types";
import styles from "./bookCard.module.css";
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";

export const BookCard = (props: { book: BookViewData }) => {
  const [template, selectedTemplate] = useState("defaultTemplate");
  return (
    <Link
      href={props.book.id}
      className={`${styles.bookCard}`}
      aria-labelledby={`title-${props.book.id}`}
      role="article"
    >
      {/* ヘッダー情報 */}
      <div className={`${styles.bookInfo_header}`}>
        <div className={`${styles.primaryInfo}`}>
          <span className={`${styles.book_title}`}>{props.book.title}</span>
          <span className={`${styles.book_author}`}>{props.book.author}</span>
        </div>
        <div className={`${styles.secondaryInfo}`}>
          <Calendar size={16} className={`${styles.dueDate_calender_icon}`} />
          <span className={`${styles.dueDate_text}`}>
            ~{props.book.dueDate.toLocaleDateString()}
          </span>
        </div>
      </div>
      {/* 基本情報 */}
      <div className={`${styles.bookInfo_base}`}>
        <div className={`${styles.bookCard_status}`}>
          {props.book.returned ? "返却済み" : "未返却"}
        </div>
        <div>{props.book.review}</div>
      </div>
    </Link>
  );
};
