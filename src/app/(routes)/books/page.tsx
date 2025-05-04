import { BookCard } from "@/components/bookCard/BookCard";
import BookGallery from "@/components/bookGallery/BookGallery";
import { fetchAllBooks } from "@/lib/api/auth/book";
import { BookViewData } from "@/types";

export default async function Home() {
  const books: BookViewData[] = await fetchAllBooks();
  // const books: BookViewData[] = null;

  if (!books) {
    return <div>本を記録してみよう</div>;
  }

  return (
    <div>
      <BookGallery>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </BookGallery>
    </div>
  );
}
