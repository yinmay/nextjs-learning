'use client';

interface ThumbUpProps {
  id: string;
}

export default function ThumbUpButton({ id }: ThumbUpProps) {
  const handleThumbUp = async () => {
    try {
      const response = await fetch(`/api/blog/thumb-up/${id}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.errno === 0) {
        alert(`Thumb up success for blog post ${data.data.id}`);
      } else {
        alert('Thumb up failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while thumbing up');
    }
  };

  return (
    <button onClick={handleThumbUp}>
      👍 Thumb Up
    </button>
  );
}
