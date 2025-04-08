import { fetchBookById } from "@/lib/api/auth/book";
import Editor from "@/service/editor/Editor";
import React from "react";

const page = async ({ params }: { params: Promise<{ bookId: string }> }) => {
  const bookId = (await params).bookId;
  const bookData = await fetchBookById(bookId);
  return <Editor book={bookData} />;
};

export default page;
