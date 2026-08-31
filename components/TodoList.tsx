import type { Todo } from '@/lib/store'
import { EmptyState } from './EmptyState'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  hasAnyTodos: boolean
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onRemove: (id: string) => void
}

export function TodoList({ todos, hasAnyTodos, onToggle, onEdit, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <EmptyState
        message={
          hasAnyTodos
            ? '조건에 맞는 할 일이 없습니다.'
            : '아직 할 일이 없습니다. 새로운 할 일을 추가해보세요.'
        }
      />
    )
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} onRemove={onRemove} />
      ))}
    </ul>
  )
}
