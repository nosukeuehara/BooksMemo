"use server"
import { deleteBookById } from "@/lib/api/auth/book"
import { revalidatePath } from "next/cache"

export async function actionDeleteBook(bookId: string) {
  try {
    const response = await deleteBookById(bookId);

    revalidatePath('/');
    return { success: true, message: response.message };
  } catch (error) {
    console.error("Server action error:", error);
    return { error: "本の削除に失敗しました" };
  }
}