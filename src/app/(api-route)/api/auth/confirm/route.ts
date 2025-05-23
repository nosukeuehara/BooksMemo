import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { _createServerClient } from '@/lib/supabase/server'

// 確認処理
export async function GET(request: NextRequest) {
  // URLからパラメータを取得
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  // リダイレクト先のURLを設定
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  // token_hashとtypeが存在する場合
  if (token_hash && type) {
    // Supabaseクライアントを作成
    const supabase = await _createServerClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    // 確認成功した場合
    if (!error) {
      // ログインページにリダイレクト
      redirectTo.pathname = '/login';
      redirectTo.searchParams.set('message', 'メール確認が完了しました。ログインしてください。');
      return NextResponse.redirect(redirectTo);
    }
  }

  // エラーページへリダイレクト
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}