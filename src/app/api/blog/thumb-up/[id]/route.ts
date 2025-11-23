import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // You can also get the request body if needed
  // const body = await request.json();

  // Here you would typically update the thumb-up count in your database
  // For now, we'll just return a success response with the id

  return NextResponse.json({
    errno: 0,
    data: {
        id
    }
  });
}
