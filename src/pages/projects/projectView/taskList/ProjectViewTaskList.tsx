import React from 'react'
import TaskListFilters from './taskListFilters'
import TaskListTable from './taskListTable'
import { Flex } from 'antd'
import { TaskType } from '../../../../types/task.types'

const ProjectViewTaskList = () => {
    // sample data for the table
    const dataSource: TaskType[] = [
        {
            taskId: 'SP-1',
            task: 'Task 1',
            description: '-',
            progress: '0%',
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
            progress: '0%',
            members: '-',
            labels: '-',
            status: 'todo',
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
            progress: '0%',
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
            progress: '0%',
            members: '-',
            labels: '-',
            status: 'todo',
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

    return (
        <Flex vertical gap={16}>
            <TaskListFilters />
            <TaskListTable dataSource={dataSource} />
        </Flex>
    )
}

export default ProjectViewTaskList
