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
  const isServer = typeof window === 'undefined'

  const redirectUrl = `${await getBaseUrl(isServer)}/api/auth/callback`
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

export async function resetPassword(formData: FormData) {
  const supabase = await _createServerClient()
  const isServer = typeof window === 'undefined'

  const _formData = {
    email: formData.get('email') as string,
  }
  const { data, error } = await supabase.auth.resetPasswordForEmail(_formData.email, {
    redirectTo: `${await getBaseUrl(isServer)}/updatePassword`,
  })
  if (error) {
    redirect('/error')
  }
  if (data) {
    console.log('Password reset email sent:', data)
  }
}