import Link from 'next/link';
import { db } from '@/lib/db';
import { blogs } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import DeleteButton from '@/components/DeleteButton';

export default async function BlogPage() {
  const database = db();
  const blogList = await database.select().from(blogs).orderBy(desc(blogs.createdAt));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header with New Post Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Blog Posts
            </h1>
            <p className="text-gray-600 mt-1">
              {blogList.length} {blogList.length === 1 ? 'post' : 'posts'}
            </p>
          </div>
          <Link
            href="/blog/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New Post
          </Link>
        </div>

        {/* Blog List */}
        {blogList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No blog posts yet</p>
            <Link
              href="/blog/new"
              className="text-gray-900 hover:underline font-medium"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {blogList.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-gray-700 mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-between text-sm">
                  <time dateTime={post.createdAt?.toISOString()} className="text-gray-500">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Unknown date'}
                  </time>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-gray-900 hover:underline font-medium"
                    >
                      Read more →
                    </Link>
                    <Link
                      href={`/blog/${post.id}/edit`}
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit
                    </Link>
                    <DeleteButton id={post.id} title={post.title} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
