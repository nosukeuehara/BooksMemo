import { BookCard, BookHeader } from "@/components/bookCard/BookCard";
import BookGallery from "@/components/bookGallery/BookGallery";
import { getUserBooks } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { BookDrawer } from "@/service/bookDrawer/BookDrawer";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>さぁ、本を読もう！！！</p>;
  }

  const books = await getUserBooks(user);

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
