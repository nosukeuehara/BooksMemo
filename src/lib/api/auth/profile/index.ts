import { _createServerClient } from "@/lib/supabase/server";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { User } from "@prisma/client";

export async function fetchUserProfile() {
  const supabase = await _createServerClient();
  try {
    const response = await fetch(`${getBaseUrl()}/api/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(
          await supabase.auth.getSession()
        ).data.session?.access_token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "ユーザープロフィールの取得に失敗しました");
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("予期せぬエラーが発生しました");
    }
  }
}

/**
 * ユーザーのプロフィールを更新する関数
 * @param name - ユーザーの名前
 */
export async function updateUserProfile(updataData: { name: string }) {
  const supabase = await _createServerClient();
  try {
    const response = await fetch(`${getBaseUrl()}/api/auth/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(
          await supabase.auth.getSession()
        ).data.session?.access_token}`,
      },
      body: JSON.stringify({
        name: updataData.name.trim(),
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "プロフィールの更新に失敗しました");
    }
    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("予期せぬエラーが発生しました");
    }
  }
}