'use client';

import { useEffect, useState } from 'react';

export default function Results() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('profileData');
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <main className="p-10">
      <h2 className="text-2xl font-bold mb-2">🔍 Profile Analysis</h2>
      <div className="mt-4">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Headline:</strong> {data.headline}</p>
        <p><strong>Connections:</strong> {data.connections}</p>
        <p><strong>Score:</strong> {data.score}</p>
        <p><strong>Tips:</strong> {data.tips}</p>
      </div>
    </main>
  );
}
