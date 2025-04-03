import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

// ユーザープロファイル取得
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // データベースでユーザーを検索
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    // ユーザーがデータベースに存在しない場合は空のプロフィールを返す
    if (!dbUser) {
      return NextResponse.json({
        email: user.email,
        name: user.user_metadata.full_name || user.email!.split('@')[0] || "",
        exists: false
      });
    }

    // ユーザープロフィールを返す
    return NextResponse.json({
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name || "",
      exists: true
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

// ユーザープロファイル登録/更新
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { name } = await request.json();

    if (name === undefined || name.trim() === "") {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // ユーザーを検索し、存在しなければ作成、存在すれば更新
    const dbUser = await prisma.user.upsert({
      where: { email: user.email },
      update: { name },
      create: {
        email: user.email!,
        name
      },
    });

    return NextResponse.json(dbUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}