"use server"
import { updateUserProfile } from "@/lib/api/auth/profile"

export async function actionUpdateProfileData(formData: FormData) {
  console.log(formData)
  try {
    const data = {
      name: formData.get("name") as string
    }

    if (!data.name) {
      return { error: "入力が必要です" }
    }

    const response = await updateUserProfile(data)
    return response
  } catch (error) {
    console.error(error)
    return { error: "プロフィールの更新に失敗しました" }
  }
}