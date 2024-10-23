import { ProjectType } from './project.types'

export type TaskStatusType = 'doing' | 'todo' | 'done'
export type TaskPriorityType = 'low' | 'medium' | 'high'

export type TaskType = {
    taskId: string
    task: string
    description?: string
    progress?: string
    members?: string
    labels?: string
    status: TaskStatusType
    priority: TaskPriorityType
    timeTracking?: string
    estimation?: string
    startDate?: Date
    dueDate?: Date
    completedDate?: Date
    createdDate?: Date
    lastUpdated?: Date
    reporter?: string
    phase?: string
    project?: ProjectType
}
