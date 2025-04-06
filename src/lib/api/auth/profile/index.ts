import { createClient } from "@/lib/supabase/server";

export async function fetchUserProfile() {
  const supabase = await createClient();
  try {
    const response = await fetch("http://localhost:3000//api/auth/profile", {
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

    const data = await response.json();
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
export async function updateUserProfile(name: string) {
  const supabase = await createClient();
  try {
    const response = await fetch("http://localhost:3000//api/auth/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(
          await supabase.auth.getSession()
        ).data.session?.access_token}`,
      },
      body: JSON.stringify({
        name: name.trim(),
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "プロフィールの更新に失敗しました");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("予期せぬエラーが発生しました");
    }
  }
}