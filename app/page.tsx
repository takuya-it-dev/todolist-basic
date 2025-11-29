"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 text-sm font-semibold rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            追加
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border rounded px-3 py-2 text-sm bg-slate-50 shadow"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-1 text-left ${todo.done ? "line-through text-slate-400" : ""
                  }`}
              >
                {todo.text}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-2 text-xs text-red-500 hover:underline"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
