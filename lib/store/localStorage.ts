import type { CreateTodoInput, Todo, TodoStore, UpdateTodoInput } from './types'

const STORAGE_KEY = 'todos'

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'number'
  )
}

function readTodos(): Todo[] {
  if (typeof window === 'undefined') return []

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (raw === null) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      console.warn('[todoStore] Stored data is not an array, resetting.')
      return []
    }
    return parsed.filter(isTodo)
  } catch (error) {
    console.warn('[todoStore] Failed to parse stored todos, resetting.', error)
    return []
  }
}

function writeTodos(todos: Todo[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export const localStorageTodoStore: TodoStore = {
  async list() {
    return readTodos()
  },

  async create(input: CreateTodoInput) {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      completed: false,
      createdAt: Date.now(),
    }
    const todos = readTodos()
    todos.push(todo)
    writeTodos(todos)
    return todo
  },

  async update(id: string, input: UpdateTodoInput) {
    const todos = readTodos()
    const index = todos.findIndex((todo) => todo.id === id)
    if (index === -1) {
      throw new Error(`Todo with id "${id}" not found`)
    }
    const updated: Todo = { ...todos[index], ...input }
    todos[index] = updated
    writeTodos(todos)
    return updated
  },

  async remove(id: string) {
    const todos = readTodos()
    writeTodos(todos.filter((todo) => todo.id !== id))
  },

  async clearCompleted() {
    const todos = readTodos()
    writeTodos(todos.filter((todo) => !todo.completed))
  },
}
