import React from 'react'
import TaskListFilters from './taskListFilters/TaskListFilters'
import TaskListTable from './taskListTable/TaskListTable'
import { Flex } from 'antd'
import { TaskType } from '../../../../types/task.types'

const ProjectViewTaskList = () => {
    // sample data for the table
    const dataSource: TaskType[] = [
        {
            taskId: 'SP-1',
            task: 'Task 1',
            description: '-',
            progress: 5,
            members: 'D',
            labels: '-',
            status: 'todo',
            priority: 'high',
            timeTracking: '-',
            estimation: '-',
            startDate: new Date(),
            dueDate: new Date(),
            completedDate: new Date(),
            createdDate: new Date(),
            lastUpdated: new Date(),
            reporter: '-',
            phase: '-',
        },
        {
            taskId: 'SP-4',
            task: 'ads',
            description: '-',
            progress: 30,
            members: '-',
            labels: '-',
            status: 'doing',
            priority: 'medium',
            timeTracking: '-',
            estimation: '-',
            startDate: new Date(),
            dueDate: new Date(),
            completedDate: new Date(),
            createdDate: new Date(),
            lastUpdated: new Date(),
            reporter: '-',
            phase: '-',
        },
        {
            taskId: 'SP-5',
            task: 'asd',
            description: '-',
            progress: 20,
            members: '-',
            labels: '-',
            status: 'todo',
            priority: 'low',
            timeTracking: '-',
            estimation: '-',
            startDate: new Date(),
            dueDate: new Date(),
            completedDate: new Date(),
            createdDate: new Date(),
            lastUpdated: new Date(),
            reporter: '-',
            phase: '-',
        },
        {
            taskId: 'SP-12',
            task: 'asds',
            description: '-',
            progress: 80,
            members: '-',
            labels: '-',
            status: 'done',
            priority: 'medium',
            timeTracking: '-',
            estimation: '-',
            startDate: new Date(),
            dueDate: new Date(),
            completedDate: new Date(),
            createdDate: new Date(),
            lastUpdated: new Date(),
            reporter: '-',
            phase: '-',
        },
    ]

    const todoData = dataSource.filter((item) => item.status === 'todo')
    const doingData = dataSource.filter((item) => item.status === 'doing')
    const doneData = dataSource.filter((item) => item.status === 'done')

    return (
        <Flex vertical gap={16}>
            <TaskListFilters />
            <TaskListTable dataSource={todoData} />
            <TaskListTable dataSource={doingData} />
            <TaskListTable dataSource={doneData} />
        </Flex>
    )
}

export default ProjectViewTaskList
