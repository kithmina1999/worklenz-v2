import React from 'react'
import TaskListFilters from './taskListFilters'
import TaskListTable from './taskListTable'
import { Flex } from 'antd'

const ProjectViewTaskList = () => {
    return (
        <Flex vertical gap={16}>
            <TaskListFilters />
            <TaskListTable />
        </Flex>
    )
}

export default ProjectViewTaskList
