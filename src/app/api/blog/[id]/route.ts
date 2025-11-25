import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const database = db();

    const [blog] = await database
      .select()
      .from(blogs)
      .where(eq(blogs.id, id))
      .limit(1);

    if (!blog) {
      return NextResponse.json({
        errno: -1,
        message: 'Blog post not found',
      });
    }

    return NextResponse.json({
      errno: 0,
      data: blog,
    });
  } catch (error) {
    return NextResponse.json({
      errno: -1,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({
        errno: -1,
        message: 'Missing required fields: title and content are required',
      });
    }

    const database = db();

    const [updatedBlog] = await database
      .update(blogs)
      .set({
        title,
        content,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id))
      .returning();

    if (!updatedBlog) {
      return NextResponse.json({
        errno: -1,
        message: 'Blog post not found',
      });
    }

    return NextResponse.json({
      errno: 0,
      data: updatedBlog,
    });
  } catch (error) {
    return NextResponse.json({
      errno: -1,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const database = db();

    const [deletedBlog] = await database
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning();

    if (!deletedBlog) {
      return NextResponse.json({
        errno: -1,
        message: 'Blog post not found',
      });
    }

    return NextResponse.json({
      errno: 0,
      data: {
        id: deletedBlog.id,
      },
    });
  } catch (error) {
    return NextResponse.json({
      errno: -1,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}
