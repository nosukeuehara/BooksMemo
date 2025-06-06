import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { _createServerClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { cacheTags } from "@/utils/cacheTags";

// Helper function to check book ownership
async function checkBookOwnership(bookId: string, userEmail: string) {
  const dbUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!dbUser) {
    return null;
  }

  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
      userId: dbUser.id
    },
  });

  return { book, dbUser };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  revalidateTag(cacheTags.UPDATE_BOOKDATA)
  try {
    const { id } = await params;

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
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const result = await checkBookOwnership(id, user.email!);

    if (!result?.book) {
      return NextResponse.json({ error: "Book not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(result.book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const result = await checkBookOwnership(id, user.email!);

    if (!result?.book) {
      return NextResponse.json({ error: "Book not found or access denied" }, { status: 404 });
    }

    const body = await request.json();
    const { title, author, borrowedDate, dueDate, review, returned } = body;

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        borrowedDate: borrowedDate ? new Date(borrowedDate) : null,
        dueDate: dueDate ? new Date(dueDate) : null,
        review,
        returned,
      },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const result = await checkBookOwnership(id, user.email!);

    if (!result?.book) {
      return NextResponse.json({ error: "Book not found or access denied" }, { status: 404 });
    }

    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}