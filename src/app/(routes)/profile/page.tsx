import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileEditor from "@/service/profile/ProfileEditor";
import { fetchUserProfile } from "@/lib/api/auth/profile";

const ProfilePage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 未認証の場合はログインページへリダイレクト
  if (!user) {
    redirect("/login");
  }

  const dbUser = await fetchUserProfile();

  // ユーザー情報を構築
  const userProfile = {
    email: user.email || "",
    name:
      dbUser?.name ||
      user.user_metadata.full_name ||
      user.email?.split("@")[0] ||
      "",
    exists: !!dbUser,
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">プロフィール設定</h1>
      <ProfileEditor profile={userProfile} />
    </div>
  );
};

export default ProfilePage;
