// src/service/bookDelete/actions.ts
"use server"
import { deleteBookById } from "@/lib/api/auth/book"
import { revalidatePath } from "next/cache"

export async function actionDeleteBook(bookId: string) {
  try {
    const response = await deleteBookById(bookId);
    console.log(response)

    if (!response.ok) {
      throw new Error('Faild to delete book')
    }

    revalidatePath('/');

    return { success: true, message: "本が正常に削除されました" };
  } catch (error) {
    console.error("Server action error:", error);
    return { error: "本の削除に失敗しました" };
  }
}