import { createClient } from "@/lib/supabase/server";
import { BookViewData } from "@/types";
import { Book } from "@prisma/client";
import { NextResponse } from "next/server";

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
        ).data.session?.access_token
          }`,
      },
    })
    return response.json()
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw new Error("Failed to fetch book data");
  }
}

export async function registBookData(registBookData: { title: string, author: string, borrowedDate: string, dueDate: string, review: string }) {
  const supabase = await createClient();
  try {
    const response = await fetch(`http://localhost:3000/api/auth/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(
          await supabase.auth.getSession()
        ).data.session?.access_token
          }`,
      },
      body: JSON.stringify({
        ...registBookData
      }),
    })
    return response.json()
  } catch (error) {
    console.error("Error regist book data:", error);
    throw new Error("Failed to regist book data");
  }
}

/**
 * 本の登録内容を更新する回数。
 * @param bookId 更新対象の本ID
 * @returns 
 */
export async function updateBookData(bookData: Book): Promise<BookViewData> {
  const supabase = await createClient()
  try {
    if (bookData.userId !== (await supabase.auth.getUser()).data.user?.id) {
      throw new Error("you have no data")
    }
    const response = await fetch(`http://localhost:3000/api/auth/books/${bookData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(
          await supabase.auth.getSession()
        ).data.session?.access_token
          }`,
      },
      body: JSON.stringify({
        ...bookData
      })
    })
    return response.json()
  } catch (error) {
    console.error("Error update book data:", error);
    throw new Error("Faild to update book data")
  }
}

/**
 * 本のIDを指定してデータを削除するための関数
 * @param bookId 削除対象の本のID
 * @returns 
 */
export async function deleteBookById(bookId: string): Promise<NextResponse<{
  error: string;
}> | NextResponse<{
  message: string;
}>> {
  const supabase = await createClient();
  try {
    const response = await fetch(`http://localhost:3000/api/auth/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(
          await supabase.auth.getSession()
        ).data.session?.access_token
          }`,
      },
    })
    return response.json()
  } catch (error) {
    console.error("Error delete book data:", error);
    throw new Error("Faild to delete book data")
  }
}