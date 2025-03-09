"use client";

import React, { useState } from "react";

const BookRegister: React.FC = () => {
  const [title, setTitle] = useState("");
  const [borrowedDate, setBorrowedDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, borrowedDate, returnDate, review });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="タイトルを入力"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="borrowedDate">貸出日</label>
          <input
            type="date"
            id="borrowedDate"
            value={borrowedDate}
            onChange={(e) => setBorrowedDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="returnDate">返却日</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="review">感想</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookRegister;
