'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!url.includes('linkedin.com')) {
      alert('Invalid LinkedIn URL');
      return;
    }

    const res = await fetch('http://localhost:8080/profile', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    localStorage.setItem('profileData', JSON.stringify(data));
    router.push('/result');
  };

  return (
    <main className="flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-4">LinkedIn Profiler</h1>
      <input
        type="text"
        placeholder="Enter LinkedIn Profile URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border border-gray-400 p-2 w-[400px] rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Analyze
      </button>
    </main>
  );
}
