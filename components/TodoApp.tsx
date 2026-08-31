'use client'

import { useTodos } from '@/lib/hooks/useTodos'
import { TodoFilter } from './TodoFilter'
import { TodoFooter } from './TodoFooter'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'

export function TodoApp() {
  const {
    todos,
    hasAnyTodos,
    filter,
    setFilter,
    isLoading,
    remainingCount,
    completedCount,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    clearCompleted,
  } = useTodos()

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-12 sm:py-20">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">할 일</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilter value={filter} onChange={setFilter} />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-zinc-400 dark:text-zinc-600">불러오는 중...</p>
      ) : (
        <>
          <TodoList
            todos={todos}
            hasAnyTodos={hasAnyTodos}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onRemove={removeTodo}
          />
          <TodoFooter
            remainingCount={remainingCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </>
      )}
    </div>
  )
}
