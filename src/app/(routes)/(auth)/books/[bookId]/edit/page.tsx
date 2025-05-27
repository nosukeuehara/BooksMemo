import { fetchBookById } from "@/lib/api/auth/book";
import Editor from "@/service/editor/Editor";

const page = async ({ params }: { params: Promise<{ bookId: string }> }) => {
  const bookId = (await params).bookId;
  const bookData = await fetchBookById(bookId);
  return (
    <div>
      <Editor book={bookData} />
    </div>
  );
};

export default page;
