// src/app/(pages)/[bookId]/page.tsx
import BookInfoViewer from "@/components/bookInfoViewer/BookInfoViewer";
import { BookInfo } from "@/types/types";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = await params;

  const bookData = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!bookData) {
    return notFound();
  }

  const book: BookInfo = {
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
