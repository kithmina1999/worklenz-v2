import React from 'react'
import TaskListFilters from './taskListFilters/TaskListFilters'
import TaskListTable from './taskListTable/TaskListTable'
import { Flex } from 'antd'
import { doingData, doneData, todoData } from '../taskData'

const ProjectViewTaskList = () => {
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
