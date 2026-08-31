'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Todo } from '@/lib/store'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onRemove: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onRemove }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEditing() {
    setDraft(todo.title)
    setIsEditing(true)
  }

  function commitEdit() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== todo.title) {
      onEdit(todo.id, trimmed)
    }
    setIsEditing(false)
  }

  function cancelEdit() {
    setDraft(todo.title)
    setIsEditing(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') commitEdit()
    if (event.key === 'Escape') cancelEdit()
  }

  return (
    <li className="group flex items-center gap-3 border-b border-zinc-200 py-3 last:border-b-0 dark:border-zinc-800">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`${todo.title} 완료 처리`}
        className="h-5 w-5 shrink-0 accent-zinc-900 dark:accent-zinc-100"
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          aria-label="할 일 제목 수정"
          className="flex-1 rounded border border-zinc-400 bg-transparent px-2 py-1 text-sm text-zinc-900 outline-none focus:border-zinc-600 dark:border-zinc-600 dark:text-zinc-100"
        />
      ) : (
        <button
          type="button"
          onDoubleClick={startEditing}
          className={`flex-1 truncate text-left text-sm ${
            todo.completed
              ? 'text-zinc-400 line-through dark:text-zinc-600'
              : 'text-zinc-900 dark:text-zinc-100'
          }`}
        >
          {todo.title}
        </button>
      )}

      {!isEditing && (
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          <button
            type="button"
            onClick={startEditing}
            aria-label="수정"
            className="rounded p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            ✎
          </button>
          <button
            type="button"
            onClick={() => onRemove(todo.id)}
            aria-label="삭제"
            className="rounded p-1 text-zinc-400 hover:text-red-500"
          >
            ✕
          </button>
        </div>
      )}
    </li>
  )
}
