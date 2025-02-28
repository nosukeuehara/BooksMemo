import { BookInfo } from "@/types/types";
import React from "react";

const BookCard = (props: { books: BookInfo[] }) => {
  return (
    <div>
      {props.books.map((book) => (
        <a key={book.id} href={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.dueDate.toLocaleString()}</p>
          <p>{book.returned ? "返却済み" : "未返却"}</p>
        </a>
      ))}
    </div>
  );
};

export default BookCard;
