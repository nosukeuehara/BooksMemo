"use server";
import { updateBookData } from "@/lib/api/auth/book";
import { UpdateResult } from "@/types";
import { Book } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function actionUpdateBookInfo(bookData: Book): Promise<UpdateResult> {
  try {
    const response = await updateBookData(bookData);

    if (!response) {
      throw new Error('Failed to update book');
    }
    revalidatePath('/');
    return { result: response };
  } catch (error) {
    console.error("Failed to update book data", error);
    return { error: "データの更新に失敗しました。" };
  }
}