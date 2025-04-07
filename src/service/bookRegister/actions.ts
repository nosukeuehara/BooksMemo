"use server"
import { registBookData } from "@/lib/api/auth/book"

export async function postBookData(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    borrowedDate: formData.get("date") as string,
    dueDate: formData.get("date") as string,
    review: formData.get("review") as string,
  }
  const response = await registBookData(data)
  return response
}