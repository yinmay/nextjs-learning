'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth/signin');
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push('/auth/signin');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Profile
            </h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          {/* User Info Card */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-6">
            {/* Avatar and Name */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold">
                {session.user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {session.user.name}
                </h2>
                <p className="text-sm text-gray-600">User Account</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* User Details */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <p className="mt-1 text-sm text-gray-600">{session.user.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">
                  Account ID
                </label>
                <p className="mt-1 text-sm text-gray-600 font-mono break-all">
                  {session.user.id}
                </p>
              </div>

              {session.user.emailVerified !== undefined && (
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Email Verification
                  </label>
                  <p className="mt-1 text-sm">
                    {session.user.emailVerified ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
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
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-600">
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
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                        Not verified
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing out...
                  </>
                ) : (
                  'Sign out'
                )}
              </button>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 h-10 px-4 py-2"
              >
                Go to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
