import { localStorageTodoStore } from './localStorage'
import type { TodoStore } from './types'

// DB로 교체할 때는 이 파일의 구현체 선택만 바꾸면 된다.
export const todoStore: TodoStore = localStorageTodoStore

export type { CreateTodoInput, Todo, TodoStore, UpdateTodoInput } from './types'
