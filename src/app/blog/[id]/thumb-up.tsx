'use client';

import { useState } from 'react';

interface ThumbUpProps {
  id: string;
  initialThumbup: number;
}

export default function ThumbUpButton({ id, initialThumbup }: ThumbUpProps) {
  const [thumbup, setThumbup] = useState(initialThumbup);
  const [loading, setLoading] = useState(false);

  const handleThumbUp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/thumb-up/${id}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.errno === 0) {
        setThumbup(data.data.thumbup);
      } else {
        alert(data.message || 'Thumb up failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while thumbing up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleThumbUp}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
      <span>{loading ? 'Thumbing up...' : `Thumb Up (${thumbup})`}</span>
    </button>
  );
}
