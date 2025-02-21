"use client";

import React, { useState } from "react";

const RegisterBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [borrowedDate, setBorrowedDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, borrowedDate, returnDate, review });
  };

  return (
    <div>
      <h1>Register a Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="borrowedDate">Borrowed Date:</label>
          <input
            type="date"
            id="borrowedDate"
            value={borrowedDate}
            onChange={(e) => setBorrowedDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="returnDate">Return Date:</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
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
    </div>
  );
};

export default RegisterBook;
