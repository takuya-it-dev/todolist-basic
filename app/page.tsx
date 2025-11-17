"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");        // 入力中の文字
  const [todos, setTodos] = useState<string[]>([]); // TODOリスト

  const addTodo = () => {
    if (!text.trim()) return; // 空欄は追加しない
    setTodos([...todos, text]);
    setText(""); // 入力欄リセット
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <main className="w-full max-w-md rounded-xl bg-white shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">TODO APP</h1>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="やることを入力"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 text-sm font-semibold rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            追加
          </button>
        </div>

        {/* TODO一覧 */}
        <ul className="space-y-2">
          {todos.map((t, i) => (
            <li
              key={i}
              className="border rounded px-3 py-2 text-sm bg-slate-50 shadow"
            >
              {t}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
