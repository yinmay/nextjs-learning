import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const database = db();

    const testUsers = [
      {
        username: 'alice_wonder',
        email: 'alice@example.com',
        image: 'https://avatar.iran.liara.run/public/girl',
        intro: 'Hello! I am Alice, a curious explorer of wonderland and code.',
      },
      {
        username: 'bob_builder',
        email: 'bob@example.com',
        image: 'https://avatar.iran.liara.run/public/boy',
        intro: 'Hi there! I am Bob, passionate about building amazing things.',
      },
    ];

    const insertedUsers = await database.insert(users).values(testUsers).returning();

    return NextResponse.json({
      success: true,
      message: 'Test users created successfully',
      data: insertedUsers,
    });
  } catch (error) {
    console.error('Failed to create test users:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
