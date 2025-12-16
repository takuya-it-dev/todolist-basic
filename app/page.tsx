"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      done: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-slate-200 px-4">
      <main className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 p-6">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-slate-900 text-center tracking-wide">
            TODO APP
          </h1>
          <p className="mt-1 text-center text-sm text-slate-600">
            {todos.length}件（完了 {doneCount}）
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border border-slate-300 bg-white rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="やることを入力"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            追加
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-1 text-left text-sm font-medium text-slate-900"
              >
                <span
                  className={
                    todo.done
                      ? "line-through text-slate-500"
                      : "text-slate-900"
                  }
                >
                  {todo.text}
                </span>
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-3 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
              >
                削除
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="mt-6 text-center text-sm text-slate-500">
            まだToDoなし。上で追加しろ。
          </p>
        )}
      </main>
    </div>
  );
}
