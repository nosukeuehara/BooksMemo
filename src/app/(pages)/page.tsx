import { BookCard, BookHeader } from "@/components/bookCard/BookCard";
import BookGallery from "@/components/bookGallery/BookGallery";
import mockBooks from "@/mock/libraryMgMock";
import { BookDrawer } from "@/service/bookDrawer/BookDrawer";
import { BookInfo } from "@/types/types";

export default function Home() {
  const books: BookInfo[] = mockBooks;
  return (
    <div>
      <BookHeader />
      <BookGallery>
        {books.map((book) => (
          <BookDrawer key={book.id} book={book}>
            <BookCard key={book.id} book={book} />
          </BookDrawer>
        ))}
      </BookGallery>
    </div>
  );
}
