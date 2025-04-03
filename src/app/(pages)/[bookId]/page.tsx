// src/app/(pages)/[bookId]/page.tsx
import BookInfoViewer from "@/components/bookInfoViewer/BookInfoViewer";
import { BookInfo } from "@/types/types";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import { createClient } from "@/utils/supabase/server";

const Page = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }

  // Find the user in our database
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!dbUser) {
    return notFound();
  }

  // Get the book only if it belongs to the authenticated user
  const bookData = await prisma.book.findFirst({
    where: {
      id: bookId,
      userId: dbUser.id,
    },
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
