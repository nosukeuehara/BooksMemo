import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'

// このミドルウェアはサインイン後にプロフィールが存在しないユーザーを
// プロフィール作成ページにリダイレクトします
export async function profileCheckMiddleware(request: NextRequest) {
  const supabase = await createClient()

  // Supabaseセッションからユーザー情報を取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 認証済みユーザーかつプロフィールページでない場合
  if (session?.user && !request.nextUrl.pathname.startsWith('/profile')) {
    // データベースでユーザーを検索
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    // ユーザープロフィールが存在しない場合、プロフィール作成ページへリダイレクト
    if (!dbUser) {
      return NextResponse.redirect(new URL('/profile', request.url))
    }
  }

}