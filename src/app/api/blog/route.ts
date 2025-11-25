import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogs } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, userId } = body;

    if (!title || !content || !userId) {
      return NextResponse.json({
        errno: -1,
        message: 'Missing required fields: title, content, and userId are required',
      });
    }

    const database = db();
    const [insertedBlog] = await database
      .insert(blogs)
      .values({
        title,
        content,
        userId,
      })
      .returning();

    return NextResponse.json({
      errno: 0,
      data: insertedBlog,
    });
  } catch (error) {
    console.error('Failed to create blog:', error);
    return NextResponse.json({
      errno: -1,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}
