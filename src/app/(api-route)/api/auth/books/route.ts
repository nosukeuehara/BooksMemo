import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { _createServerClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { cacheTags } from "@/utils/cacheTags";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const supabase = await _createServerClient();

    // トークンを使用してユーザー情報を取得
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      return NextResponse.json(
        { error: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { title, author, borrowedDate, dueDate, review } = await request.json();

    if (!title || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create user in our database based on Supabase auth
    let dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.email!,
          name: user.user_metadata.full_name || user.email!.split('@')[0],
        },
      });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        borrowedDate: !borrowedDate ? null : new Date(borrowedDate),
        dueDate: !dueDate ? null : new Date(dueDate),
        review: review || "",
        user: {
          connect: { id: dbUser.id }
        }
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create book ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  revalidateTag(cacheTags.UPDATE_BOOKDATA)
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const supabase = await _createServerClient();

    // トークンを使用してユーザー情報を取得
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      return NextResponse.json(
        { error: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      return NextResponse.json([]);
    }

    const books = await prisma.book.findMany({
      where: {
        userId: dbUser.id
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to authenticate user" },
      { status: 500 }
    );
  }
}