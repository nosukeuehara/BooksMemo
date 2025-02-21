import mockBooks from "@/mock/libraryMgMock";
import { Book } from "@/types/types";

export default function Home() {
  const data: Book[] = mockBooks;
  return (
    <div>
      <h1>Books Memo</h1>
      <div>memo</div>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.author}</p>
            <p>{item.dueDate.toString()}</p>
            <p>{item.returned ? "返却済み" : "未返却"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
