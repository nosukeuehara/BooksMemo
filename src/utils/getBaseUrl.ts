import { headers } from "next/headers"

export const getBaseUrl = async (isServer: boolean) => {

  if (isServer) {
    // サーバーサイドの場合
    try {
      const headersList = await headers()
      const host = headersList.get('host')
      const protocol = headersList.get('x-forwarded-proto') || 'http'
      return `${protocol}://${host}`
    } catch (error) {
      console.error('Error getting base URL:', error)
      // headers()が使えない場合のフォールバック
      return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }
  } else {
    // クライアントサイドの場合
    return window.location.origin
  }
}