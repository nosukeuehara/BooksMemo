import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

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
  { params }: { params: { id: string } }
) {
  const _params = await (params)
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const supabase = await createClient();

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

    const result = await checkBookOwnership(_params.id, user.email!);

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
  { params }: { params: { id: string } }
) {
  const _params = await (params)
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required のすけのすけ" },
        { status: 401 }
      );
    }

    const supabase = await createClient();

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

    const result = await checkBookOwnership(_params.id, user.email!);

    if (!result?.book) {
      return NextResponse.json({ error: "Book not found or access denied" }, { status: 404 });
    }

    const body = await request.json();
    const { title, author, borrowedDate, dueDate, review, returned } = body;

    const updatedBook = await prisma.book.update({
      where: { id: _params.id },
      data: {
        title,
        author,
        borrowedDate: new Date(borrowedDate),
        dueDate: new Date(dueDate),
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
  { params }: { params: { id: string } }
) {
  const _params = await (params)
  try {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const supabase = await createClient();

    // トークンを使用してユーザー情報を取得
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error) {
      return NextResponse.json(
        { error: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const result = await checkBookOwnership(_params.id, user.email!);

    if (!result?.book) {
      return NextResponse.json({ error: "Book not found or access denied" }, { status: 404 });
    }

    await prisma.book.delete({
      where: { id: _params.id },
    });

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}