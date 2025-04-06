"use client";
import { BookViewData } from "@/types";
import React, { useState } from "react";

const BookForm = (props: { book: BookViewData }) => {
  const { title, borrowedDate, dueDate } = props.book;

  // 初期値を useState にセット（YYYY-MM-DD 形式に変換）
  const [_title, setTitle] = useState(title);
  const [_borrowedDate, setBorrowedDate] = useState(
    borrowedDate.toISOString().split("T")[0]
  );
  const [_returnDate, setReturnDate] = useState(
    dueDate.toISOString().split("T")[0]
  );
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Book Title:</label>
        <input
          type="text"
          id="title"
          value={_title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="borrowedDate">Borrowed Date: </label>
        <input
          type="date"
          id="borrowedDate"
          value={_borrowedDate}
          onChange={(e) => setBorrowedDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="returnDate">Return Date: </label>
        <input
          type="date"
          id="returnDate"
          value={_returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
