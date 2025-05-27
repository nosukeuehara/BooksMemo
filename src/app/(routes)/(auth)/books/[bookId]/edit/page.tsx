import { fetchBookById } from "@/lib/api/auth/book";
import Editor from "@/service/editor/Editor";
import { cacheTags } from "@/utils/cacheTags";
import { revalidateTag } from "next/cache";
import React from "react";

const page = async ({ params }: { params: Promise<{ bookId: string }> }) => {
  const bookId = (await params).bookId;
  revalidateTag(cacheTags.UPDATE_BOOKDATA);
  const bookData = await fetchBookById(bookId);
  return (
    <div>
      <Editor book={bookData} />
    </div>
  );
};

export default page;
