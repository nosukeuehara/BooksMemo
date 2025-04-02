// src/app/(pages)/page.tsx
import { BookCard, BookHeader } from "@/components/bookCard/BookCard";
import BookGallery from "@/components/bookGallery/BookGallery";
import { BookDrawer } from "@/service/bookDrawer/BookDrawer";
import { BookInfo } from "@/types/types";
import prisma from "@/lib/prisma";

export default async function Home() {
  const booksData = await prisma.book.findMany({
    orderBy: {
      borrowedDate: "desc",
    },
  });

  const books: BookInfo[] = booksData.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    borrowedDate: book.borrowedDate,
    dueDate: book.dueDate,
    returned: book.returned,
    review: book.review || "",
  }));

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
