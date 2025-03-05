import BookCard from "@/components/bookCard/BookCard";
import BookGallery from "@/components/bookGallery/BookGallery";
import Navigation from "@/components/navi/Navigation";
import mockBooks from "@/mock/libraryMgMock";
import { BookInfo } from "@/types/types";

export default function Home() {
  const books: BookInfo[] = mockBooks;
  console.log("ooo");
  return (
    <div>
      <Navigation />
      <BookGallery>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </BookGallery>
    </div>
  );
}
