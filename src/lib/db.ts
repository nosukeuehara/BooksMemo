import { BookViewData } from "@/types";
import { User } from "@supabase/supabase-js";
import prisma from "@/lib/prisma";

export async function getUserBooks(user: User): Promise<Array<BookViewData>> {
  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      throw new Error("User not found in the database.");
    }

    const booksData = await prisma.book.findMany({
      where: {
        userId: dbUser.id,
      },
      orderBy: {
        borrowedDate: "desc",
      },
    });

    return booksData.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      borrowedDate: book.borrowedDate,
      dueDate: book.dueDate,
      returned: book.returned,
      review: book.review || "",
    }));
  } catch (error) {
    console.error("Error fetching user books:", error);
    return []
  }

}