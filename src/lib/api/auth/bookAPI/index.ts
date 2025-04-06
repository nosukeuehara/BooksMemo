import { createClient } from "@/lib/supabase/server";
import { BookViewData } from "@/types";

/**
 * 本のデータを取得する関数
 * @returns {Promise<BookViewData[]>} - A promise that resolves to an array of book data.
 */
export async function fetchAllBooks(): Promise<BookViewData[]> {
  const supabase = await createClient();
  try {
    const response = await fetch("http://localhost:3000/api/auth/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(
          await supabase.auth.getSession()
        ).data.session?.access_token
          }`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw new Error("Failed to fetch book data");
  }
}

/**
 * 本のIDを指定してデータを取得する関数
 * @param bookId - The ID of the book to fetch.
 * @returns 
 */
export async function fetchBookById(bookId: string): Promise<BookViewData> {
  const supabase = await createClient();
  try {
    const response = await fetch(`http://localhost:3000/api/auth/books/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(
          await supabase.auth.getSession()
        ).data.session?.access_token}`,
      },
    })
    return response.json()
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw new Error("Failed to fetch book data");
  }
}