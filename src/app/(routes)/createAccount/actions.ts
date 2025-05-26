'use server'

import { _createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

/**
 * サインアップ
 *
 * サインアップが成功した場合はプロフィール作成ページへリダイレクトする。
 * サインアップに失敗した場合はエラーページへリダイレクトする。
 *
 * @param formData - フォームから受け取ったデータ
 * @returns void
 */
export async function signup(formData: FormData) {
  const supabase = await _createServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }
}