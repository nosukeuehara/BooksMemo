import { BookViewData } from "@/types";
import BookInfoViewer from "../bookInfoViewer/BookInfoViewer";

export function BookPage({ book }: { book: BookViewData }) {
  return <BookInfoViewer book={book} />;
}
