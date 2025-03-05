import BookCard from "@/components/bookCard/BookCard";
import BookGallery from "@/components/bookGallery/BookGallery";
import mockBooks from "@/mock/libraryMgMock";
import { BookInfo } from "@/types/types";

export default function Home() {
  const books: BookInfo[] = mockBooks;
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
