import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { title, author, borrowedDate, dueDate, review, userId } = await request.json();

    if (!title || !author || !borrowedDate || !dueDate || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        borrowedDate: new Date(borrowedDate),
        dueDate: new Date(dueDate),
        review: review || "",
        user: {
          connect: { id: userId }
        }
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      include: {
        user: true,
      },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}