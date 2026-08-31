'use client'

import { useEffect, useState } from 'react'
import { todoStore } from '@/lib/store'
import type { Todo } from '@/lib/store'

export type Filter = 'all' | 'active' | 'completed'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    todoStore.list().then((loaded) => {
      if (!cancelled) {
        setTodos(loaded)
        setIsLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  async function addTodo(title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    const created = await todoStore.create({ title: trimmed })
    setTodos((prev) => [...prev, created])
  }

  async function toggleTodo(id: string) {
    const target = todos.find((todo) => todo.id === id)
    if (!target) return
    const updated = await todoStore.update(id, { completed: !target.completed })
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)))
  }

  async function editTodo(id: string, title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    const updated = await todoStore.update(id, { title: trimmed })
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)))
  }

  async function removeTodo(id: string) {
    await todoStore.remove(id)
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  async function clearCompleted() {
    await todoStore.clearCompleted()
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const remainingCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - remainingCount

  return {
    todos: filteredTodos,
    hasAnyTodos: todos.length > 0,
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
  }
}
