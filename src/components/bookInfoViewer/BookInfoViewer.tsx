import React from "react";
import styles from "./bookInfoViewer.module.css";
import { BookViewData } from "@/types";
import { Text, Paper } from "@mantine/core";

interface BookInfoProps {
  book: BookViewData;
}

const BookInfoViewer = ({ book }: BookInfoProps) => {
  return (
    <Paper shadow="sm" radius="xs" p="xl" mih="500">
      <Text className={styles.bookTitle}>{book.title}</Text>
      <Text className={styles.bookAuthor}>{book.author}</Text>
      <Text className={styles.bookReview}>{book.review}</Text>
    </Paper>
  );
};

export default BookInfoViewer;
