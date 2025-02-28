import BookForm from "@/components/editor/BookForm";
import mockBooks from "@/mock/libraryMgMock";
import { BookInfo } from "@/types/types";
import React from "react";

const page = ({ params }: { params: { bookId: string } }) => {
  const book: BookInfo = mockBooks.filter(
    (book) => book.id === params.bookId
  )[0];
  return <BookForm book={book} />;
};

export default page;
