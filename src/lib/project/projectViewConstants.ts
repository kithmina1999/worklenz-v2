import React, { ReactNode } from 'react';
import ProjectViewTaskList from '../../pages/projects/projectView/taskList/ProjectViewTaskList';
import ProjectViewBoard from '../../pages/projects/projectView/board/ProjectViewBoard';
import ProjectViewWorkload from '../../pages/projects/projectView/workload/ProjectViewWorkload';
import ProjectViewRoadmap from '../../pages/projects/projectView/roadmap/ProjectViewRoadmap';
import ProjectViewInsights from '../../pages/projects/projectView/insights/ProjectViewInsights';
import ProjectViewFiles from '../../pages/projects/projectView/files/ProjectViewFiles';
import ProjectViewMembers from '../../pages/projects/projectView/members/ProjectViewMembers';
import ProjectViewUpdates from '../../pages/projects/projectView/updates/ProjectViewUpdates';

// type of a tab items
type TabItems = {
  index: number;
  key: string;
  label: string;
  isPinned?: boolean;
  element: ReactNode;
};

// settings all element items use for tabs
export const tabItems: TabItems[] = [
  {
    index: 0,
    key: 'tasks-list',
    label: 'Task List',
    isPinned: true,
    element: React.createElement(ProjectViewTaskList),
  },
  {
    index: 1,
    key: 'board',
    label: 'Board',
    isPinned: true,
    element: React.createElement(ProjectViewBoard),
  },
  {
    index: 2,
    key: 'workload',
    label: 'Workload',
    element: React.createElement(ProjectViewWorkload),
  },
  {
    index: 3,
    key: 'roadmap',
    label: 'Roadmap',
    element: React.createElement(ProjectViewRoadmap),
  },
  {
    index: 4,
    key: 'project-insights-member-overview',
    label: 'Insights',
    element: React.createElement(ProjectViewInsights),
  },
  {
    index: 5,
    key: 'all-attachments',
    label: 'Files',
    element: React.createElement(ProjectViewFiles),
  },
  {
    index: 6,
    key: 'members',
    label: 'Members',
    element: React.createElement(ProjectViewMembers),
  },
  {
    index: 7,
    key: 'updates',
    label: 'Updates',
    element: React.createElement(ProjectViewUpdates),
  },
];
