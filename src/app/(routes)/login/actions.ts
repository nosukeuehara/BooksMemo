'use server'

import { _createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { getBaseUrl } from '@/utils/getBaseUrl'

/**
 * ログイン
 *
 * ログインが成功した場合は、プロフィールが存在すればトップページへ、
 * 存在しなければプロフィール作成ページへリダイレクトする。
 * ログインに失敗した場合はエラーページへリダイレクトする。
 *
 * @param formData - フォームから受け取ったデータ
 * @returns void
 */
export async function login(formData: FormData) {
  const supabase = await _createServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: authData } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login/error')
  }

  // ユーザーのプロフィールが存在するか確認
  if (authData.user) {
    const dbUser = await prisma.user.findUnique({
      where: { email: authData.user.email },
    })

    // プロフィールが存在しない場合はプロフィール作成ページへ
    if (!dbUser) {
      revalidatePath('/profile', 'page')
      redirect('/profile')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/books')
}

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

  revalidatePath('/profile', 'page')
  redirect('/profile')
}

/**
 * サインアウト
 *
 * サインアウトが成功した場合はログインページへリダイレクトする。
 * サインアウトに失敗した場合はエラーページへリダイレクトする。
 *
 * @returns void
 */
export async function signout() {
  const supabase = await _createServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  redirect('/login')
}

/**
 * OAuthログイン
  *
  * GoogleのOAuthログインを実行する。
  * ログインが成功した場合は、Supabaseの認証フローに従ってリダイレクトされる。
  *
  * @returns void
 */
export async function oauthLogin() {
  const supabase = await _createServerClient()

  const redirectUrl = `${getBaseUrl()}/api/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl
    },
  })
  if (data.url) {
    redirect(data.url)
  }
  if (error) {
    redirect('/error')
  }
}