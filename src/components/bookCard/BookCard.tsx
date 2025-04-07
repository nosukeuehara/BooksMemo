"use client";
import { BookViewData } from "@/types";
import styles from "./bookCard.module.css";
import React from "react";
import { Calendar, Ellipsis } from "lucide-react";
import Link from "next/link";
import { Menu } from "@mantine/core";
import BookDelete from "@/service/bookDelete/BookDelete";

export const BookCard = (props: { book: BookViewData }) => {
  return (
    <div className={`${styles.bookCard}`}>
      <div className={`${styles.menu_ellipsis}`}>
        <Menu
          trigger="hover"
          openDelay={100}
          closeDelay={400}
          position="bottom-end"
        >
          <Menu.Target>
            <Ellipsis />
          </Menu.Target>
          <Menu.Dropdown>
            <BookDelete bookId={props.book.id} title={props.book.title} />
          </Menu.Dropdown>
        </Menu>
      </div>
      {/* ヘッダー情報 */}
      <div className={`${styles.bookInfo_header}`}>
        <div className={`${styles.primaryInfo}`}>
          <div className={`${styles.book_title}`}>
            <span>{props.book.title}</span>
          </div>
          <span className={`${styles.book_author}`}>{props.book.author}</span>
        </div>
        <div className={`${styles.secondaryInfo}`}>
          <Calendar size={16} className={`${styles.dueDate_calender_icon}`} />
          <span className={`${styles.dueDate_text}`}>
            {new Date(props.book.dueDate).toLocaleDateString("ja-JP")}
          </span>
        </div>
      </div>
      <Link
        href={props.book.id}
        aria-labelledby={`title-${props.book.id}`}
        role="article"
      >
        {/* 基本情報 */}
        <div className={`${styles.bookInfo_base}`}>
          <div className={`${styles.bookCard_status}`}>
            {props.book.returned ? "返却済み" : "未返却"}
          </div>
          <div className={`${styles.bookInfo_review}`}>{props.book.review}</div>
        </div>
      </Link>
    </div>
  );
};
