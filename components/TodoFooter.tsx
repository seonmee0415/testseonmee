type TodoFooterProps = {
  remainingCount: number
  completedCount: number
  onClearCompleted: () => void
}

export function TodoFooter({ remainingCount, completedCount, onClearCompleted }: TodoFooterProps) {
  return (
    <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
      <span>{remainingCount}개 남음</span>
      {completedCount > 0 && (
        <button
          type="button"
          onClick={onClearCompleted}
          className="font-medium text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400"
        >
          완료 항목 삭제 ({completedCount})
        </button>
      )}
    </div>
  )
}
