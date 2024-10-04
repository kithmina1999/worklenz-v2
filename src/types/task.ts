type TaskStatusType = 'Doing' | 'Todo' | 'Done'

export type TaskType = {
    taskId: string
    task: string
    status: TaskStatusType
    dueDate: string
    project: string
}
