import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogs } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const database = db();

    // Increment thumbup count by 1
    const [updatedBlog] = await database
      .update(blogs)
      .set({
        thumbup: sql`${blogs.thumbup} + 1`,
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
      data: {
        id: updatedBlog.id,
        thumbup: updatedBlog.thumbup,
      },
    });
  } catch (error) {
    return NextResponse.json({
      errno: -1,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}
