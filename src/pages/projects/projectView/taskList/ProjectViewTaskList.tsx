import React from 'react'
import { Flex } from 'antd'

import TaskListFilters from './taskListFilters/TaskListFilters'
import TaskListTable from './taskListTable/TaskListTable'

import { TaskType } from '../../../../types/task.types'
import { useAppSelector } from '../../../../hooks/useAppSelector'

const ProjectViewTaskList = () => {
    // sample data from task reducer
    const dataSource: TaskType[] = useAppSelector(
        (state) => state.taskReducer.tasks
    )

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
