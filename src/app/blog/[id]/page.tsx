import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { blogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import ThumbUpButton from './thumb-up';

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const database = db();
  const [blog] = await database
    .select()
    .from(blogs)
    .where(eq(blogs.id, id))
    .limit(1);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog List
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {blog.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <time dateTime={blog.updatedAt.toISOString()}>
                {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </div>
          </div>

          {/* Thumb Up Button */}
          <div className="pt-6 border-t border-gray-200">
            <ThumbUpButton id={id} initialThumbup={blog.thumbup} />
          </div>
        </div>
      </div>
    </div>
  );
}
