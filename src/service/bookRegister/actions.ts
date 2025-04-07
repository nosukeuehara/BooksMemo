"use server"
import { registBookData } from "@/lib/api/auth/book"

export async function actionPostBookData(formData: FormData) {
  try {
    const data = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      borrowedDate: formData.get("borrowedDate") as string,
      dueDate: formData.get("dueDate") as string,
      review: formData.get("review") as string,
    }

    // Validate data
    if (!data.title || !data.author || !data.borrowedDate || !data.dueDate) {
      return { error: "すべての必須フィールドを入力してください" };
    }

    const response = await registBookData(data);
    return response;
  } catch (error) {
    console.error("Server action error:", error);
    return { error: "本の登録に失敗しました" };
  }
}