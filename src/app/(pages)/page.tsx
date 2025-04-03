// src/app/(pages)/page.tsx
import { BookCard, BookHeader } from "@/components/bookCard/BookCard";
import BookGallery from "@/components/bookGallery/BookGallery";
import { BookDrawer } from "@/service/bookDrawer/BookDrawer";
import { BookInfo } from "@/types/types";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let books: BookInfo[] = [];

  if (user) {
    // Find the user in our database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (dbUser) {
      // Get only books belonging to the authenticated user
      const booksData = await prisma.book.findMany({
        where: {
          userId: dbUser.id,
        },
        orderBy: {
          borrowedDate: "desc",
        },
      });

      books = booksData.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        borrowedDate: book.borrowedDate,
        dueDate: book.dueDate,
        returned: book.returned,
        review: book.review || "",
      }));
    }
  }

  return (
    <div>
      <BookHeader />
      <BookGallery>
        {books.length > 0 ? (
          books.map((book) => (
            <BookDrawer key={book.id} book={book}>
              <BookCard key={book.id} book={book} />
            </BookDrawer>
          ))
        ) : (
          <p>No books found. Add a book to get started!</p>
        )}
      </BookGallery>
    </div>
  );
}
