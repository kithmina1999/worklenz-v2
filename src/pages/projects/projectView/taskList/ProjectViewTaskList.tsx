import React from 'react'
import TaskListFilters from './taskListFilters/TaskListFilters'
import TaskListTable from './taskListTable/TaskListTable'
import { Flex } from 'antd'
import { TaskType } from '../../../../types/task.types'
import { useAppSelector } from '../../../../hooks/useAppSelector'

const ProjectViewTaskList = () => {
    // sample data from task reducer
    const dataSource: TaskType[] = useAppSelector(
        (state) => state.taskReducer.tasks
    )

    return (
        <Flex vertical gap={16}>
            <TaskListFilters />
            <TaskListTable dataSource={dataSource} />
        </Flex>
    )
}

export default ProjectViewTaskList
