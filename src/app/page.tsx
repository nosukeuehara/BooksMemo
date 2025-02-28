import BookCard from "@/components/BookCard";
import mockBooks from "@/mock/libraryMgMock";
import { BookInfo } from "@/types/types";

export default function Home() {
  const books: BookInfo[] = mockBooks;
  return (
    <div>
      <BookCard books={books} />
    </div>
  );
}
