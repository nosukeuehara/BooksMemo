import { updateBookData } from "@/lib/api/auth/book";
import { Book } from "@prisma/client";
import { revalidatePath } from "next/cache";
export async function actionUpdateBookInfo(bookData: Book) {
  try {
    const response = await updateBookData(bookData)

    if (!response) {
      throw new Error('Faild to delete book')
    }
    revalidatePath('/');
    return response
  } catch (error) {
    console.error("Faild to update book data", error)
    return { error: "データの更新に失敗しました。" }
  }
}