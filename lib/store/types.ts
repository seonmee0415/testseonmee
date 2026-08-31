export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export type CreateTodoInput = {
  title: string
}

export type UpdateTodoInput = {
  title?: string
  completed?: boolean
}

export interface TodoStore {
  list(): Promise<Todo[]>
  create(input: CreateTodoInput): Promise<Todo>
  update(id: string, input: UpdateTodoInput): Promise<Todo>
  remove(id: string): Promise<void>
  clearCompleted(): Promise<void>
}
