'use client';

import { useState } from 'react';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      setTitle('');
      window.location.reload(); // ページをリロードして更新
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Todo"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2" disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
