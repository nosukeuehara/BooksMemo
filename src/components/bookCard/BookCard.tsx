"use client";
import { BookViewData } from "@/types";
import styles from "./bookCard.module.css";
import { Calendar, Edit, Ellipsis } from "lucide-react";
import Link from "next/link";
import { Button, Menu } from "@mantine/core";
import BookDelete from "@/service/bookDelete/BookDelete";
import { useRouter } from "next/navigation";

export const BookCard = (props: { book: BookViewData }) => {
  const router = useRouter();
  return (
    <div className={`${styles.bookCard}`}>
      <Link
        href={props.book.id}
        aria-labelledby={`title-${props.book.id}`}
        role="article"
      >
        <div className={`${styles.menu_ellipsis}`}>
          <Menu
            trigger="click-hover"
            openDelay={100}
            closeDelay={400}
            position="bottom-end"
          >
            <Menu.Target>
              <Ellipsis onClick={(e) => e.preventDefault()} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="div">
                <Button
                  variant="transparent"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/${props.book.id}/edit`);
                  }}
                  leftSection={<Edit size={14} />}
                >
                  編集する
                </Button>
              </Menu.Item>
              <Menu.Item component="div">
                <BookDelete bookId={props.book.id} title={props.book.title} />
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
