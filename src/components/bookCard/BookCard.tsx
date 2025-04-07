"use client";
import { BookViewData } from "@/types";
import styles from "./bookCard.module.css";
import React, { useState } from "react";
import { Calendar, Ellipsis, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button, Menu } from "@mantine/core";
import { useRouter } from "next/navigation";

export const BookCard = (props: { book: BookViewData }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm("この本を削除しますか？")) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/auth/books/${props.book.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "本の削除に失敗しました");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("予期せぬエラーが発生しました");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={`${styles.bookCard}`}>
      {error && <div className={styles.error}>{error}</div>}
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
            <Menu.Item
              color="red"
              leftSection={<Trash2 size={14} color="red" />}
            >
              <Button loading={isSubmitting} onClick={handleDelete}>
                削除する
              </Button>
            </Menu.Item>
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
