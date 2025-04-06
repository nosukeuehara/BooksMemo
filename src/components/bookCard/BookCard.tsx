"use client";
import { BookViewData } from "@/types";
import styles from "./bookCard.module.css";
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Editor from "@/service/editor/Editor";

export const BookCard = (props: { book: BookViewData }) => {
  const [viewTemplate, setViewTemplate] = useState("default");
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className={`${styles.bookCard}`}>
      {/* ヘッダー情報 */}
      <div className={`${styles.bookInfo_header}`}>
        <div className={`${styles.primaryInfo}`}>
          <div onClick={open} className={`${styles.book_title}`}>
            <span>{props.book.title}</span>
            <span className={`${styles.edit_text}`}>編集する</span>
          </div>

          <span className={`${styles.book_author}`}>{props.book.author}</span>
        </div>
        <div className={`${styles.secondaryInfo}`}>
          <Calendar size={16} className={`${styles.dueDate_calender_icon}`} />
          <span className={`${styles.dueDate_text}`}>
            {new Date(props.book.dueDate).toLocaleDateString("ja-JP")}
          </span>
        </div>
        <Modal opened={opened} onClose={close} title="Authentication" centered>
          <Editor book={props.book} />
        </Modal>
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
