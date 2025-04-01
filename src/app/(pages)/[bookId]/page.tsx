import BookInfoViewer from "@/components/bookInfoViewer/BookInfoViewer";
import mockBooks from "@/mock/libraryMgMock";
import { BookInfo } from "@/types/types";
import React from "react";

const page = async ({ params }: { params: Promise<{ bookId: string }> }) => {
  const { bookId } = await params;
  // TODO:API call to get book info
  const book: BookInfo | undefined = mockBooks.find(
    async (book) => book.id === bookId
  );

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <BookInfoViewer book={book} />
    </div>
  );
};

export default page;
