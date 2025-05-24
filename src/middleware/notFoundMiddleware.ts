import { NextRequest, NextResponse } from 'next/server'

export async function notFoundMiddleware(req: NextRequest) {
  // APIルートへのアクセスの場合
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json(
      {
        error: "Not Found",
        message: "The requested resource was not found. Please complete your profile setup first."
      },
      { status: 404 }
    )
  }

  // 通常のページアクセスの場合
  return NextResponse.redirect(new URL('/profile', req.url))
}