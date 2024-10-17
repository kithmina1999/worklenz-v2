import React, { ReactNode } from 'react'
import ProjectViewTaskList from './taskList/ProjectViewTaskList'
import ProjectViewBoard from './board/ProjectViewBoard'
import ProjectViewWorkload from './workload/ProjectViewWorkload'
import ProjectViewRoadmap from './roadmap/ProjectViewRoadmap'
import ProjectViewInsights from './insights/ProjectViewInsights'
import ProjectViewFiles from './files/ProjectViewFiles'
import ProjectViewMembers from './members/ProjectViewMembers'
import ProjectViewUpdates from './updates/ProjectViewUpdates'

// type of a tab items
type TabItems = {
    key: string
    name: string
    isPinShow?: boolean
    element: ReactNode
}

// settings all element items use for tabs
export const tabItems: TabItems[] = [
    {
        key: 'taskList',
        name: 'Task List',
        isPinShow: true,
        element: React.createElement(ProjectViewTaskList),
    },
    {
        key: 'board',
        name: 'Board',
        isPinShow: true,
        element: React.createElement(ProjectViewBoard),
    },
    {
        key: 'workload',
        name: 'Workload',
        element: React.createElement(ProjectViewWorkload),
    },
    {
        key: 'roadmap',
        name: 'Roadmap',
        element: React.createElement(ProjectViewRoadmap),
    },
    {
        key: 'insights',
        name: 'Insights',
        element: React.createElement(ProjectViewInsights),
    },
    {
        key: 'files',
        name: 'Files',
        element: React.createElement(ProjectViewFiles),
    },
    {
        key: 'members',
        name: 'Members',
        element: React.createElement(ProjectViewMembers),
    },
    {
        key: 'updates',
        name: 'Updates',
        element: React.createElement(ProjectViewUpdates),
    },
]
