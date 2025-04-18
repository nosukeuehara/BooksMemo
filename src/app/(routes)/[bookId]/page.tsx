import BookInfoViewer from "@/components/bookInfoViewer/BookInfoViewer";
import React from "react";
import { BookViewData } from "@/types";
import { fetchBookById } from "@/lib/api/auth/book";

export const metadata = {
  title: "本の詳細",
  description: "本の詳細情報を表示します",
};

const Page = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = await params;

  // Get the book only if it belongs to the authenticated user
  const bookData = await fetchBookById(bookId);

  if (!bookData) {
    return <p>本が見つかりませんでした</p>;
  }

  const book: BookViewData = {
    id: bookData.id,
    title: bookData.title,
    author: bookData.author,
    borrowedDate: bookData.borrowedDate,
    dueDate: bookData.dueDate,
    returned: bookData.returned,
    review: bookData.review || "",
  };

  return (
    <div>
      <BookInfoViewer book={book} />
    </div>
  );
};

export default Page;
