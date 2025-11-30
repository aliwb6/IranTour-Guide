'use client';

import { useRouter } from 'next/navigation';

interface TagButtonProps {
  children: React.ReactNode;
  tag?: string;
}

export function TagButton({ children, tag }: TagButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (tag) {
      router.push(`/events?tag=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 gradient-tag text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg"
    >
      {children}
    </button>
  );
}
